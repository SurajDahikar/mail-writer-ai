const Navbar = () => {
    return (
      <header className="w-full bg-white border-b shadow-sm px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 tracking-tight">
          Dashboard
        </h2>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition">
            Login
          </button>
        </div>
      </header>
    );
  };
  
  export default Navbar;
  