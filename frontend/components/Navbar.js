import React from 'react'; // Import React

// Navbar component that displays the application logo and title
const Navbar = () => {
  return (
    <nav className="bg-white p-4 flex items-center"> {/* Flex container for alignment */}
      <img 
        src="/logo.png"              // Source of the logo image
        alt="Logo"                   // Alternative text 
        className="h-8 w-8 mr-3"     // Sets height and width of the image with right margin for spacing
      />
      <h1 className="text-black text-2xl font-bold">TODO</h1> {/* Main heading for the application */}
    </nav>
  );
};

export default Navbar;
