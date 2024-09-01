// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON bodies into JavaScript objects

// MongoDB Connection
const mongoURI = 'mongodb://localhost:27017/todo-app'; // MongoDB connection string
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Event listeners for connection success and error handling
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB successfully.'); // Log success message upon connection
});

mongoose.connection.on('error', (err) => {
  console.error(`Error connecting to MongoDB: ${err.message}`); // Log error message if connection fails
});

// Define a Todo schema and model
const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true }, // The title of the todo item
  description: { type: String, required: true }, // The description of the todo item
  date: { type: Date, default: Date.now }, // The date field defaults to the current date
});

// Create a Todo model based on the schema
const Todo = mongoose.model('Todo', TodoSchema);

// API Route: Create a new Todo
app.post('/api/todos', async (req, res) => {
  const { title, description } = req.body; // Destructure title and description from the request body
  try {
    const todo = new Todo({
      title,
      description,
    });
    await todo.save(); // Save the new todo to the database
    res.status(201).send(todo); // Send a 201 Created response with the saved todo
  } catch (error) {
    console.error('Error creating todo:', error); // Log any errors that occur
    res.status(400).send({ message: 'Error creating todo', error: error.message }); // Respond with a 400 Bad Request status
  }
});

// API Route: Retrieve Todos with Pagination
app.get('/api/todos', async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameters
  const limit = 10; // Set the number of todos per page
  try {
    const todos = await Todo.find()
      .skip((page - 1) * limit) // Skip the number of todos for previous pages
      .limit(limit); // Limit the results to the specified number
    res.status(200).send(todos); // Send a 200 OK response with the todos
  } catch (error) {
    console.error('Error fetching todos:', error); // Log any errors that occur
    res.status(500).send({ message: 'Error fetching todos' }); // Respond with a 500 Internal Server Error status
  }
});

// API Route: Update an existing Todo
app.put('/api/todos/:id', async (req, res) => {
  const { id } = req.params; // Get the todo ID from the URL parameters
  const { title, description } = req.body; // Destructure title and description from the request body

  try {
    const todo = await Todo.findByIdAndUpdate(id, { title, description }, { new: true }); // Update the todo and return the updated document
    
    if (!todo) {
      return res.status(404).send({ message: 'Todo not found' }); // If the todo doesn't exist, respond with 404
    }
    res.send(todo); // Send the updated todo as the response
  } catch (error) {
    console.error('Error updating todo:', error); // Log any errors that occur
    res.status(400).send({ message: 'Error updating todo', error: error.message }); // Respond with a 400 Bad Request status
  }
});

// API Route: Delete a Todo
app.delete('/api/todos/:id', async (req, res) => {
  const { id } = req.params; // Get the todo ID from the URL parameters

  try {
    const todo = await Todo.findByIdAndDelete(id); // Find and delete the todo by ID
    if (!todo) {
      return res.status(404).send({ message: 'Todo not found' }); // If the todo doesn't exist, respond with 404
    }
    res.send({ message: 'Todo deleted successfully' }); // Respond with a success message
  } catch (error) {
    console.error('Error deleting todo:', error); // Log any errors that occur
    res.status(500).send({ message: 'Error deleting todo' }); // Respond with a 500 Internal Server Error status
  }
});

// Start Server
const PORT = process.env.PORT || 5000; // Set the port to the environment variable or default to 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log server start-up message
});
