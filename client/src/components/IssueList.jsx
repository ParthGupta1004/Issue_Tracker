import React from 'react';
import IssueItem from './IssueItem';

const IssueList = ({ issues, onRefresh }) => {
    if (issues.length === 0) {
        return (
            <div className="bg-slate-800/70 border border-white/10 rounded-xl p-10 text-center">
                <h3 className="text-xl font-bold mb-2">No Tasks Found</h3>
                <p className="text-slate-400">Try adjusting your search or filters to find what you're looking for.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,350px),1fr))] gap-5">
            {issues.map((issue) => (
                <IssueItem key={issue._id} issue={issue} onRefresh={onRefresh} />
            ))}
        </div>
    );
};

export default IssueList;
