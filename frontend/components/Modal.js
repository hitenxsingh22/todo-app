import React, { useState } from 'react'; // Import React and the useState hook

// Modal component that displays a form for adding a new todo
const Modal = ({ isOpen, onClose, onAdd }) => {
  // State variables to hold the input values for title and description
  const [title, setTitle] = useState(''); // State for the todo title
  const [description, setDescription] = useState(''); // State for the todo description

  // If the modal is not open, do not render anything
  if (!isOpen) return null;

  // Handle the submission of the new todo
  const handleSubmit = () => {
    // Ensure both title and description are provided before adding
    if (title && description) {
      onAdd({ title, description }); // Call the onAdd function passed as a prop
      setTitle(''); // Reset title input field
      setDescription(''); // Reset description input field
      onClose(); // Close the modal
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"> {/* Overlay background with opacity */}
      <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md"> {/* Modal container with white background, padding, and responsive width */}
        <h2 className="text-xl font-bold mb-4 text-center">Add New Todo</h2> {/* Modal title */}
        
        {/* Input field for the todo title */}
        <input
          type="text"
          placeholder="Title" // Placeholder text for the title input
          value={title} // Bind the value to the title state
          onChange={(e) => setTitle(e.target.value)} // Update title state on input change
          className="border px-3 py-2 w-full mb-4" // Styling for the input field
        />

        {/* Textarea for the todo description */}
        <textarea
          placeholder="Description" // Placeholder text for the description textarea
          value={description} // Bind the value to the description state
          onChange={(e) => setDescription(e.target.value)} // Update description state on input change
          className="border px-3 py-2 w-full mb-4" // Styling for the textarea
          rows="4" // Set initial rows for height adjustment
        ></textarea>

        {/* Container for action buttons */}
        <div className="flex justify-between"> 
          {/* Add button to submit the new todo */}
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 mr-2">
            Add
          </button>
          {/* Cancel button to close the modal */}
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Export the Modal component
export default Modal;
