import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/issues';

export const getIssues = (params) => axios.get(API_URL, { params });
export const createIssue = (issueData) => axios.post(API_URL, issueData);
export const updateIssue = (id, issueData) => axios.put(`${API_URL}/${id}`, issueData);
export const deleteIssue = (id) => axios.delete(`${API_URL}/${id}`);
