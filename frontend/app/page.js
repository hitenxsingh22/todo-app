"use client"; 
import React, { useState, useEffect } from 'react'; // Import React and hooks for state and lifecycle management
import Sidebar from '../components/Sidebar'; // Import the Sidebar component for displaying the list of todos
import Content from '../components/Content'; // Import the Content component for editing todos
import Modal from '../components/Modal'; // Import the Modal component for adding new todos
import Navbar from '@/components/Navbar'; // Import the Navbar component to provide navigation

// Main Page component that manages state and renders the application's main structure
const Page = () => {
  // State hooks to hold and manage data related to todos and UI state
  const [todos, setTodos] = useState([]); // State to store the list of todos fetched from the server
  const [selectedTodo, setSelectedTodo] = useState(null); // State to hold the currently selected todo for editing
  const [isModalOpen, setModalOpen] = useState(false); // State to manage the visibility of the modal for adding todos

  // Effect that runs on component mount to fetch the initial list of todos
  useEffect(() => { 
    fetchTodos(1); // Fetch the first page of todos when the component first loads
  }, []);

  // Function to fetch todos from the backend API with pagination
  const fetchTodos = async (page) => { 
    try {
      // Send a GET request to the API to retrieve todos for the specified page
      const response = await fetch(`http://localhost:5000/api/todos?page=${page}`);
      // If the response is not ok, throw an error
      if (!response.ok) { 
        throw new Error(`HTTP error! status: ${response.status}`); 
      } 
      // Parse the response as JSON and update the todos state
      const data = await response.json(); 
      setTodos(data); 
    } catch (error) { 
      console.error('Error fetching todos:', error); // Log any error that occurs during fetching
    } 
  };

  // Function to add a new todo
  const addTodo = async (todo) => { 
    try { 
      // Send a POST request to the API to create a new todo
      const response = await fetch('http://localhost:5000/api/todos', { 
        method: 'POST', // Use the POST HTTP method
        headers: { 
          'Content-Type': 'application/json', // Set the Content-Type header to application/json
        }, 
        body: JSON.stringify(todo), // Convert the todo object to a JSON formatted string
      }); 
      // If the response is not ok, throw an error
      if (!response.ok) { 
        throw new Error(`HTTP error! status: ${response.status}`); 
      } 
      // Refresh the todo list after adding the new todo
      await fetchTodos(1); 
    } catch (error) { 
      console.error('Error adding todo:', error); // Log any error that occurs during adding
    } 
  };

  // Function to update an existing todo
  const updateTodo = async (id, updatedTodo) => { 
    try { 
      // Send a PUT request to the API to update the specified todo
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, { 
        method: 'PUT', // Use the PUT HTTP method for updates
        headers: { 
          'Content-Type': 'application/json', // Set the Content-Type header to application/json
        }, 
        body: JSON.stringify(updatedTodo), // Convert the updated todo object to a JSON string
      }); 
      // If the response is not ok, throw an error
      if (!response.ok) { 
        throw new Error(`HTTP error! status: ${response.status}`); 
      } 
      // Refresh the todo list after the update
      await fetchTodos(1); 
    } catch (error) { 
      console.error('Error updating todo:', error); // Log any error that occurs during updating
    } 
  };

  // Function to delete a todo by its ID
  const deleteTodo = async (id) => { 
    try { 
      // Send a DELETE request to the API to remove the specified todo
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, { 
        method: 'DELETE', // Use the DELETE HTTP method
      }); 
      // If the response is not ok, throw an error
      if (!response.ok) { 
        throw new Error(`HTTP error! status: ${response.status}`); 
      } 
      // Refresh the todo list after deletion
      await fetchTodos(1); 
      setSelectedTodo(null); // Clear the selected todo after deletion
    } catch (error) { 
      console.error('Error deleting todo:', error); // Log any error that occurs during deletion
    } 
  };

  return (
    <div className="flex flex-col h-screen bg-gray-200"> {/* Main container for the entire page */}
      <Navbar /> {/* Render Navbar at the top of the page */}
      <div className="flex flex-grow mt-4"> {/* Container for Sidebar and Content area */}
        <div className="w-1/4 bg-gray-200"> {/* Sidebar occupies 25% of the width and has a grey background */}
          <Sidebar todos={todos} selectTodo={setSelectedTodo} setModalOpen={setModalOpen} /> {/* Render Sidebar component */}
        </div>
        <div className="flex-grow bg-gray-200"> {/* Content area takes up the remaining width with grey background */}
          <Content 
            selectedTodo={selectedTodo} 
            updateTodo={updateTodo} 
            deleteTodo={deleteTodo} 
          /> {/* Render Content component */}
        </div>
      </div>
      {/* Conditional rendering of the Modal for adding a new todo */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center"> 
          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onAdd={addTodo} /> {/* Render Modal component */}
        </div>
      )}
    </div>
  );
};

export default Page;
