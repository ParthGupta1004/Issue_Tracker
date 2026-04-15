import React, { useState, useEffect, useCallback } from 'react';
import { getIssues } from '../services/api';
import IssueForm from '../components/IssueForm';
import IssueList from '../components/IssueList';
import Filter from '../components/Filter';
import SearchBar from '../components/SearchBar';
import Stats from '../components/Stats';

const Home = () => {
    const [issues, setIssues] = useState([]);
    const [allIssues, setAllIssues] = useState([]); // Keep track of all issues for global stats
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ search: '', status: 'All', priority: 'All' });

    const fetchIssues = useCallback(async () => {
        setLoading(true);
        try {
            // Fetch all issues for global stats calculation
            const { data: all } = await getIssues({ status: 'All', priority: 'All' });
            setAllIssues(all);
            
            // Fetch filtered issues for display
            const { data } = await getIssues(filters);
            setIssues(data);
        } catch (error) {
            console.error('Error fetching issues', error);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchIssues();
    }, [fetchIssues]);

    const handleSearch = (searchTerm) => {
        setFilters((prev) => ({ ...prev, search: searchTerm }));
    };

    const handleFilterChange = (type, value) => {
        setFilters((prev) => ({ ...prev, [type]: value }));
    };

    return (
        <div className="home-container">
            <header className="text-center mb-12">
                <div className="inline-block bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-[0.75rem] font-bold mb-3 border border-indigo-500/20">Issue-Tracker</div>
                <h1 className="text-5xl font-bold mb-1 text-white">Issue Tracking Platform</h1>
                <p className="text-slate-400">Manage and monitor your project tasks effectively.</p>
            </header>

            <main className="space-y-10">
                <section>
                    <Stats issues={allIssues} />
                </section>
                
                <section>
                    <IssueForm onRefresh={fetchIssues} />
                </section>

                <section className="flex flex-wrap gap-8 mb-8 items-end glass-card">
                    <SearchBar onSearch={handleSearch} />
                    <Filter onFilterChange={handleFilterChange} />
                </section>

                <section>
                    <h2 className="text-xl font-bold mb-5">Current Issues</h2>
                    {loading ? (
                        <div className="text-center py-10 text-slate-400">Loading issues...</div>
                    ) : (
                        <IssueList issues={issues} onRefresh={fetchIssues} />
                    )}
                </section>
            </main>
        </div>
    );
};

export default Home;
