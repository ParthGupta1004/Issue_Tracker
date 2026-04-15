import React from 'react';

const Filter = ({ onFilterChange }) => {
    return (
        <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-slate-400">Status</label>
                <select onChange={(e) => onFilterChange('status', e.target.value)} className="bg-slate-900 border border-white/10 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500">
                    <option value="All">All Statuses</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                </select>
            </div>
            <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-slate-400">Priority</label>
                <select onChange={(e) => onFilterChange('priority', e.target.value)} className="bg-slate-900 border border-white/10 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500">
                    <option value="All">All Priorities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
        </div>
    );
};

export default Filter;
