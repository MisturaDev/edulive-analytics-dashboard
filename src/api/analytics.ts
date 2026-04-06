import { apiClient } from './client'

export const fetchClasses = () => apiClient.get('/classes')
export const fetchSummary = () => apiClient.get('/summary')
export const fetchTimeseries = () => apiClient.get('/timeseries')
export const fetchLeaderboard = () => apiClient.get('/leaderboard')
