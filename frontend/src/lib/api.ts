import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('espn_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Scores
export const scoresApi = {
  getLive: () => apiClient.get('/scores/live'),
  getBySport: (sport: string) => apiClient.get(`/scores/${sport}`),
};

// News
export const newsApi = {
  getTopHeadlines: (limit = 20) => apiClient.get('/news', { params: { limit } }),
  getBySport: (sport: string, limit = 15) => apiClient.get(`/news/${sport}`, { params: { limit } }),
};

// Teams
export const teamsApi = {
  getBySport: (sport: string, league: string) => apiClient.get(`/teams/${sport}/${league}`),
  getById: (sport: string, league: string, teamId: string) => apiClient.get(`/teams/${sport}/${league}/${teamId}`),
  getRoster: (sport: string, league: string, teamId: string) => apiClient.get(`/teams/${sport}/${league}/${teamId}/roster`),
};

// Sports
export const sportsApi = {
  getStandings: (sport: string, league: string) => apiClient.get(`/sports/${sport}/${league}/standings`),
  getSchedule: (sport: string, league: string) => apiClient.get(`/sports/${sport}/${league}/schedule`),
};

// Players
export const playersApi = {
  getById: (sport: string, playerId: string) => apiClient.get(`/players/${sport}/${playerId}`),
  getStats: (sport: string, playerId: string) => apiClient.get(`/players/${sport}/${playerId}/stats`),
};

// Auth
export const authApi = {
  login: (email: string, password: string) => apiClient.post('/auth/login', { email, password }),
  register: (email: string, username: string, password: string) => apiClient.post('/auth/register', { email, username, password }),
  getProfile: () => apiClient.get('/auth/profile'),
};

// Fantasy
export const fantasyApi = {
  getMyLeagues: () => apiClient.get('/fantasy/leagues'),
  getLeagueStandings: (leagueId: string) => apiClient.get(`/fantasy/leagues/${leagueId}/standings`),
  getMyTeam: (leagueId: string) => apiClient.get(`/fantasy/leagues/${leagueId}/my-team`),
};

// Search
export const searchApi = {
  search: (query: string) => apiClient.get('/search', { params: { q: query } }),
};
