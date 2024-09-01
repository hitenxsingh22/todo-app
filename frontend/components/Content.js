import React, { useState, useEffect } from 'react';
import { MdDelete } from 'react-icons/md'; // Import the delete icon

// Content component to display and edit todo details
const Content = ({ selectedTodo, updateTodo, deleteTodo }) => {
    // State variables to hold the title and description of the selected todo
    const [title, setTitle] = useState(selectedTodo?.title || ''); // Initialize title from selectedTodo or empty string
    const [description, setDescription] = useState(selectedTodo?.description || ''); // Initialize description
    const [isEditingTitle, setIsEditingTitle] = useState(false); // Manage edit mode for title
    const [isEditingDescription, setIsEditingDescription] = useState(false); // Manage edit mode for description

    // Effect to update title and description when selectedTodo changes
    useEffect(() => {
        setTitle(selectedTodo?.title || ''); // Update title
        setDescription(selectedTodo?.description || ''); // Update description
    }, [selectedTodo]);

    // Function to handle update action
    const handleUpdate = () => {
        if (selectedTodo) {
            // Log current values before the update for debugging
            console.log("Updating Todo: ", selectedTodo._id, { title, description });
            updateTodo(selectedTodo._id, { title, description }); // Call the update function
        }
        // Exit editing mode after updating
        setIsEditingTitle(false);
        setIsEditingDescription(false);
    };

    // Function to handle delete action
    const handleDelete = () => {
        if (selectedTodo) {
            deleteTodo(selectedTodo._id); // Call the delete function with selectedTodo ID
        }
    };

    // Render a message if no todo is selected
    if (!selectedTodo) {
        return (
            <div className="flex items-center justify-center p-8 bg-gray-200 h-[20vh]">
                <h2 className="text-lg">Select a todo to view details.</h2>
            </div>
        );
    }

    return (
        <div className="bg-gray-200 p-4 h-full"> {/* Grey background for the outer layer */}
            <div className="bg-white p-6 rounded shadow-md h-[75vh] max-w-[90%] mx-auto flex flex-col"> {/* White background for the content area */}
                <div className="flex justify-between items-center mb-4">
                    {isEditingTitle ? (
                        <input
                            type="text"
                            className="border px-3 py-2 mb-2 w-full" // Full width input for editing
                            value={title} // Bound to title state
                            onChange={(e) => setTitle(e.target.value)} // Update title state on change
                            onBlur={() => setIsEditingTitle(false)} // Exit edit mode on blur
                            autoFocus // Automatically focus on input when editing
                        />
                    ) : (
                        <h2 
                            className="text-2xl mb-2 text-center font-bold cursor-pointer overflow-hidden text-ellipsis" 
                            onClick={() => setIsEditingTitle(true)} // Trigger edit mode on click
                        >
                            {title} {/* Display the title */}
                        </h2>
                    )}
                    
                    {/* Delete Icon */}
                    <MdDelete 
                        onClick={handleDelete} // Call delete handler on click
                        className="text-black cursor-pointer hover:text-gray-700" // Delete icon styling
                        size={24} // Size of the delete icon
                    />
                </div>

                {/* Separator Line */}
                <div className="border-b-2 border-black mb-4" /> {/* Visual separation between heading and content */}

                {/* Description */}
                {isEditingDescription ? (
                    <textarea
                        className="border px-3 py-2 w-full mb-4" // Textarea for editing description
                        value={description} // Bound to description state
                        onChange={(e) => setDescription(e.target.value)} // Update description state on change
                        onBlur={() => setIsEditingDescription(false)} // Exit edit mode on blur
                        rows="10" // Set number of visible rows for the textarea
                        style={{ resize: 'none', overflow: 'hidden' }} // Disable resizing and prevent overflow
                    ></textarea>
                ) : (
                    <p 
                        className="text-gray-600 text-sm cursor-pointer mb-4 overflow-hidden" // Styling for the non-editable description
                        onClick={() => setIsEditingDescription(true)} // Trigger edit mode on click
                    >
                        {description} {/* Display the description */}
                    </p>
                )}

                {/* Update Button */}
                {(isEditingTitle || isEditingDescription) && ( // Show the Update button only during edit mode
                    <div className="flex justify-center mb-4">
                        <button 
                            onClick={handleUpdate} // Call the update handler on click
                            className="bg-blue-500 text-white px-3 py-1 w-24" // Styling for the update button
                        >
                            Update
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Content;
