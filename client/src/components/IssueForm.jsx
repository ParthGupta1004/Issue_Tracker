import React, { useState } from 'react';
import { createIssue } from '../services/api';

const IssueForm = ({ onRefresh }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [assignedTo, setAssignedTo] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) return alert('Title is required');

        setLoading(true);
        try {
            await createIssue({ title, description, priority, assignedTo: assignedTo || 'Unassigned' });
            setTitle('');
            setDescription('');
            setPriority('Medium');
            setAssignedTo('');
            onRefresh();
        } catch (error) {
            console.error('Failed to create issue', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="mb-8 bg-slate-800/70 border border-white/10 rounded-xl p-6" onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-5">Create New Issue</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 mb-5">
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-400">Title</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Issue title..."
                        className="bg-white/5 border border-white/10 rounded-md px-3 py-2.5 text-white transition-colors duration-200 focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-400">Priority</label>
                    <select 
                        value={priority} 
                        onChange={(e) => setPriority(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-md px-3 py-2.5 text-white transition-colors duration-200 focus:outline-none focus:border-indigo-500"
                    >
                        <option value="Low" className="bg-slate-900">Low</option>
                        <option value="Medium" className="bg-slate-900">Medium</option>
                        <option value="High" className="bg-slate-900">High</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-slate-400">Assigned To</label>
                    <input 
                        type="text" 
                        value={assignedTo} 
                        onChange={(e) => setAssignedTo(e.target.value)} 
                        placeholder="User name..."
                        className="bg-white/5 border border-white/10 rounded-md px-3 py-2.5 text-white transition-colors duration-200 focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <div className="flex flex-col gap-1.5 col-span-full">
                    <label className="text-sm font-medium text-slate-400">Description</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        placeholder="Detailed description..."
                        className="bg-white/5 border border-white/10 rounded-md px-3 py-2.5 text-white transition-colors duration-200 focus:outline-none focus:border-indigo-500 min-h-[100px]"
                    />
                </div>
            </div>
            <button type="submit" disabled={loading} className="bg-indigo-600 text-white w-full py-3 rounded-md font-semibold hover:bg-indigo-500 transition-colors duration-200 disabled:opacity-50">
                {loading ? 'Creating...' : 'Create Issue'}
            </button>
        </form>
    );
};

export default IssueForm;
