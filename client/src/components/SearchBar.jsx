import React from 'react';

const SearchBar = ({ onSearch }) => {
    return (
        <div className="flex-[1.5] min-w-0 w-full sm:min-w-[300px]">
            <input
                type="text"
                placeholder="Search issues by title..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2.5 text-white transition-colors duration-200 focus:outline-none focus:border-indigo-500"
            />
        </div>
    );
};

export default SearchBar;
