const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

async function request<T = any>(
  path: string,
  options: RequestInit & { params?: Record<string, any> } = {}
): Promise<{ data: T }> {
  let url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  if (options.params) {
    const qs = new URLSearchParams(
      Object.entries(options.params).map(([k, v]) => [k, String(v)])
    ).toString();
    url += (url.includes('?') ? '&' : '?') + qs;
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('espn_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errMessage = `HTTP error! status: ${res.status}`;
    try {
      const errData = await res.json();
      errMessage = errData.message || errMessage;
    } catch {}
    throw new Error(errMessage);
  }

  const data = await res.json();
  return { data };
}

export const apiClient = {
  get: <T = any>(url: string, config?: { params?: Record<string, any> }) =>
    request<T>(url, { method: 'GET', ...config }),
  post: <T = any>(url: string, body?: any) =>
    request<T>(url, { method: 'POST', body: JSON.stringify(body) }),
  put: <T = any>(url: string, body?: any) =>
    request<T>(url, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T = any>(url: string) =>
    request<T>(url, { method: 'DELETE' }),
};

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

// Teacher Provided Sports API (Direct fallback & backend proxy)
const TEACHER_DIRECT_BASE = 'https://sport-api.eunglyzhia.com/api/v1';

export const teacherSportsApi = {
  getAllSports: async () => {
    try {
      return await apiClient.get('/sports/provided');
    } catch {
      return await apiClient.get(`${TEACHER_DIRECT_BASE}/sports`);
    }
  },
  getSportByUuid: async (uuid: string) => {
    try {
      return await apiClient.get('/sports/provided/item/' + uuid);
    } catch {
      return await apiClient.get(`${TEACHER_DIRECT_BASE}/sports/${uuid}`);
    }
  },
  getCategories: async () => {
    try {
      return await apiClient.get('/sports/provided/categories');
    } catch {
      return await apiClient.get(`${TEACHER_DIRECT_BASE}/categories`);
    }
  },
  getEvents: async () => {
    try {
      return await apiClient.get('/sports/provided/events');
    } catch {
      return await apiClient.get(`${TEACHER_DIRECT_BASE}/events`);
    }
  },
  getEventByUuid: async (uuid: string) => {
    try {
      return await apiClient.get('/sports/provided/events/' + uuid);
    } catch {
      return await apiClient.get(`${TEACHER_DIRECT_BASE}/events/${uuid}`);
    }
  },
  getComments: async (eventUuid: string) => {
    try {
      return await apiClient.get('/sports/provided/comments/events/' + eventUuid);
    } catch {
      return await apiClient.get(`${TEACHER_DIRECT_BASE}/comments/events/${eventUuid}`);
    }
  },
  createComment: async (eventUuid: string, comment: string) => {
    try {
      return await apiClient.post('/sports/provided/comments', { eventUuid, comment });
    } catch {
      return await apiClient.post(`${TEACHER_DIRECT_BASE}/comments`, { eventUuid, comment });
    }
  },
  getFavorites: async () => {
    try {
      return await apiClient.get('/sports/provided/favorites');
    } catch {
      return await apiClient.get(`${TEACHER_DIRECT_BASE}/favorites`);
    }
  },
  createFavorite: async (payload: { sportUuid?: string; eventUuid?: string }) => {
    try {
      return await apiClient.post('/sports/provided/favorites', payload);
    } catch {
      return await apiClient.post(`${TEACHER_DIRECT_BASE}/favorites`, payload);
    }
  },
};
