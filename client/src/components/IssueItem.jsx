import React, { useState } from 'react';
import { updateIssue, deleteIssue } from '../services/api';

const IssueItem = ({ issue, onRefresh }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(issue.title);
    const [description, setDescription] = useState(issue.description || '');
    const [priority, setPriority] = useState(issue.priority);
    const [status, setStatus] = useState(issue.status);
    const [assignedTo, setAssignedTo] = useState(issue.assignedTo || 'Unassigned');
    const [isDeleting, setIsDeleting] = useState(false);

    const resetDraft = () => {
        setTitle(issue.title);
        setDescription(issue.description || '');
        setPriority(issue.priority);
        setStatus(issue.status);
        setAssignedTo(issue.assignedTo || 'Unassigned');
    };

    const startEditing = () => {
        resetDraft();
        setIsEditing(true);
    };

    const discardChanges = () => {
        resetDraft();
        setIsEditing(false);
    };

    const handleUpdate = async () => {
        try {
            await updateIssue(issue._id, { 
                title, 
                description, 
                priority, 
                status, 
                assignedTo 
            });
            setIsEditing(false);
            onRefresh();
        } catch (error) {
            console.error('Update failed', error);
        }
    };


    const handleDelete = async () => {
        try {
            console.log(`Initiating delete for ID: ${issue._id}`);
            await deleteIssue(issue._id);
            onRefresh();
        } catch (error) {
            console.error('Delete failed:', error.response ? error.response.data : error.message);
            alert(`Failed to delete: ${error.response?.data?.message || error.message}`);
            setIsDeleting(false);
        }
    };

    return (
        <div className="bg-slate-800/70 border border-white/10 rounded-2xl p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-1 hover:border-white/20 relative h-full">
            <div className="flex justify-between items-center">
                {isEditing ? (
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className="bg-white/5 border border-white/10 rounded-md text-white px-2 py-1 text-sm font-bold focus:outline-none focus:border-indigo-500 flex-1 mr-2"
                    />
                ) : (
                    <h3 className="font-bold text-[1.1rem] text-white">{issue.title}</h3>
                )}
                <span className={`px-2.5 py-1 rounded-md text-[0.7rem] font-bold uppercase ${
                    issue.status === 'Open' ? 'bg-indigo-600 text-white' : 
                    issue.status === 'In Progress' ? 'bg-yellow-400 text-slate-900' : 
                    'bg-emerald-500 text-white'
                }`}>
                    {issue.status}
                </span>
            </div>
            
            {isEditing ? (
                <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    className="w-full min-h-[80px] bg-white/5 border border-white/10 rounded-md text-white p-2 my-1 text-sm resize-y focus:outline-none focus:border-indigo-500"
                />
            ) : (
                <p className="text-slate-400 text-[0.85rem] my-1 leading-relaxed">{issue.description}</p>
            )}
            
            <div className="grid grid-cols-1 gap-2 text-[0.8rem]">
                <div className="flex items-center gap-2">
                    <strong className="text-slate-500 font-semibold">Priority:</strong> 
                    {isEditing ? (
                        <select 
                            value={priority} 
                            onChange={(e) => setPriority(e.target.value)}
                            className="bg-slate-900 border border-white/10 rounded-md text-white px-2 py-0.5 text-xs focus:outline-none focus:border-indigo-500"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    ) : (
                        <span className={`font-semibold ${
                            issue.priority === 'High' ? 'text-red-400' : 
                            issue.priority === 'Medium' ? 'text-yellow-400' : 
                            'text-emerald-400'
                        }`}>{issue.priority}</span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <strong className="text-slate-500 font-semibold">Assigned to:</strong> 
                    <div className="flex items-center">
                        {isEditing ? (
                            <input 
                                type="text" 
                                value={assignedTo} 
                                onChange={(e) => setAssignedTo(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-md text-white px-2 py-0.5 text-xs focus:outline-none focus:border-indigo-500"
                            />
                        ) : (
                            <span className="text-slate-200">{issue.assignedTo}</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-white/5">
                {isEditing ? (
                    <>
                        <select 
                            value={status} 
                            onChange={(e) => setStatus(e.target.value)}
                            className="bg-slate-900 border border-white/10 rounded-md text-white px-2 py-1 text-xs focus:outline-none focus:border-indigo-500 mr-auto"
                        >
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Closed">Closed</option>
                        </select>
                        <button onClick={handleUpdate} className="px-4 py-2 rounded-md font-semibold text-xs bg-emerald-600 text-white hover:bg-emerald-500 transition-colors">Save</button>
                        <button onClick={discardChanges} className="px-4 py-2 rounded-md font-semibold text-xs bg-slate-700 text-white hover:bg-slate-600 transition-colors">Discard</button>
                    </>
                ) : isDeleting ? (
                    <div className="flex items-center gap-3 w-full animate-pulse">
                        <span className="text-red-500 font-bold text-sm flex-1">Delete this issue?</span>
                        <button onClick={handleDelete} className="px-4 py-2 rounded-md font-bold text-xs bg-red-600 text-white hover:bg-red-500 transition-colors shadow-lg shadow-red-900/20">Yes, Delete</button>
                        <button onClick={() => setIsDeleting(false)} className="px-4 py-2 rounded-md font-semibold text-xs bg-slate-700 text-white hover:bg-slate-600 transition-colors">Cancel</button>
                    </div>
                ) : (
                    <>
                        <button onClick={startEditing} className="px-4 py-2 rounded-md font-semibold text-xs bg-slate-700/50 text-slate-300 border border-white/5 hover:bg-slate-700 hover:text-white transition-all">Update</button>
                        <button onClick={() => setIsDeleting(true)} className="px-4 py-2 rounded-md font-semibold text-xs bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">Delete</button>
                    </>
                ) }
            </div>
        </div>
    );
};

export default IssueItem;
