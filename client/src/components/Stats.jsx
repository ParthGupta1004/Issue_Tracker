import React from 'react';

const Stats = ({ issues }) => {
    const counts = {
        total: issues.length,
        open: issues.filter(i => i.status === 'Open').length,
        inProgress: issues.filter(i => i.status === 'In Progress').length,
        closed: issues.filter(i => i.status === 'Closed').length
    };

    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-5 mb-10">
            <div className="bg-slate-800/50 border border-white/10 p-5 rounded-xl text-center transition-colors duration-200 hover:border-white/20 text-white">
                <span className="block text-[1.75rem] font-bold mb-1">{counts.total}</span>
                <span className="text-[0.7rem] uppercase tracking-wider opacity-60">Total</span>
            </div>
            <div className="bg-slate-800/50 border border-white/10 p-5 rounded-xl text-center transition-colors duration-200 hover:border-white/20 text-red-400">
                <span className="block text-[1.75rem] font-bold mb-1">{counts.open}</span>
                <span className="text-[0.7rem] uppercase tracking-wider opacity-60">Open</span>
            </div>
            <div className="bg-slate-800/50 border border-white/10 p-5 rounded-xl text-center transition-colors duration-200 hover:border-white/20 text-yellow-400">
                <span className="block text-[1.75rem] font-bold mb-1">{counts.inProgress}</span>
                <span className="text-[0.7rem] uppercase tracking-wider opacity-60">In Progress</span>
            </div>
            <div className="bg-slate-800/50 border border-white/10 p-5 rounded-xl text-center transition-colors duration-200 hover:border-white/20 text-emerald-400">
                <span className="block text-[1.75rem] font-bold mb-1">{counts.closed}</span>
                <span className="text-[0.7rem] uppercase tracking-wider opacity-60">Closed</span>
            </div>
        </div>
    );
};

export default Stats;
