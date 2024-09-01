import React, { useState } from 'react'; // Import React and useState hook
import { FaSearch } from 'react-icons/fa'; // Import the search icon from react-icons

// Sidebar component for displaying the list of todos and providing search functionality
const Sidebar = ({ todos, selectTodo, setModalOpen }) => {
    // State variable to hold the search term entered by the user
    const [searchTerm, setSearchTerm] = useState('');
    // State variable to toggle the visibility of the search input field
    const [isSearching, setIsSearching] = useState(false);

    // Filter todos based on the search term for title and description
    const filteredTodos = todos.filter(todo => {
        // Check if the title includes the search term (case insensitive)
        const titleMatch = todo.title.toLowerCase().includes(searchTerm.toLowerCase());
        // Check if the description includes the search term (case insensitive)
        const descriptionMatch = todo.description.toLowerCase().includes(searchTerm.toLowerCase());
        // Return todos that match either the title or the description
        return titleMatch || descriptionMatch;
    });

    return (
        <div className="bg-gray-200 h-full p-4"> {/* Sidebar container with gray background and padding */}
            <div className="mb-4 flex justify-between items-center flex-wrap"> {/* Flexbox for layout of the button and search icon */}
                <button
                    onClick={() => setModalOpen(true)} // Open modal when clicked
                    className="flex items-center px-2 py-2 bg-black text-white rounded hover:bg-gray-800" // Button styling
                >
                    <img src="/vector.png" alt="Add Todo" className="h-5 w-5 mr-1" /> {/* Image added before TODO text */}
                    <span className="font-bold text-xs md:text-sm">TODO</span> {/* Button text that changes size based on screen size */}
                </button>
                
                {/* Button for search functionality */}
                <button 
                    onClick={() => setIsSearching(!isSearching)} 
                    className="mt-2 md:mt-0 px-2 py-2 bg-gray-50 rounded hover:bg-gray-400 text-xs md:text-sm" // Button styling
                >
                    <FaSearch /> {/* Search icon */}
                </button>
            </div>
            
            {/* Render search input field when searching is enabled */}
            {isSearching && (
                <input
                    type="text"
                    className="border px-2 py-1 w-full mb-4 text-xs md:text-sm" // Input field styling
                    placeholder="Search todos..." // Placeholder text for the search input
                    value={searchTerm} // Bind value to state
                    onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
                />
            )}
            
            {/* Conditional Rendering for Todos */}
            <ul>
                {filteredTodos.length === 0 ? ( // Check if there are no filtered todos
                    <li className="text-gray-500 text-center"> {/* Centered message for no todos */}
                        Currently, there aren’t any todos. Please add some!
                    </li>
                ) : (
                    filteredTodos.map((todo) => (
                        <li
                            key={todo._id} // Unique key for each todo
                            onClick={() => selectTodo(todo)} // Select the todo on click
                            className="p-2 mb-4 bg-white rounded shadow hover:bg-gray-300 cursor-pointer h-18 w-full flex flex-col justify-between"
                        >
                            <div className="font-bold text-xs md:text-sm overflow-hidden whitespace-nowrap text-ellipsis" style={{ maxWidth: '100%' }}>
                                {todo.title} {/* Display todo title */}
                            </div>

                            <div className="text-gray-600 text-xs md:text-sm overflow-hidden whitespace-nowrap text-ellipsis" style={{ maxWidth: '100%' }}>
                                {todo.description.length > 40 ? `${todo.description.substring(0, 40)}...` : todo.description} {/* Display todo description */}
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Sidebar;
