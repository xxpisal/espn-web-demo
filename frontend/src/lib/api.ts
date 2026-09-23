import { STORAGE_KEYS, API_URLS } from '@/lib/constants';
import {
  TeacherSportItem,
  TeacherCategoryItem,
  TeacherEventItem,
  TeacherCommentItem,
  TeacherFavoriteItem,
} from '@/types';

// ---------------------------------------------------------------------------
// Core fetch wrapper
// ---------------------------------------------------------------------------

async function request<T = unknown>(
  path: string,
  options: RequestInit & { params?: Record<string, string | number> } = {},
): Promise<{ data: T }> {
  const url = buildUrl(path, options.params);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) ?? {}),
  };

  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem(STORAGE_KEYS.TOKEN)
      : null;

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const message = await parseErrorMessage(res);
    throw new Error(message);
  }

  const data = (await res.json()) as T;
  return { data };
}

function buildUrl(
  path: string,
  params?: Record<string, string | number>,
): string {
  const base = path.startsWith('http') ? path : `${API_URLS.LOCAL}${path}`;
  if (!params) return base;

  const qs = new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)]),
  ).toString();

  return `${base}${base.includes('?') ? '&' : '?'}${qs}`;
}

async function parseErrorMessage(res: Response): Promise<string> {
  const fallback = `HTTP error ${res.status}`;
  try {
    const body = await res.json();
    return (body as { message?: string }).message ?? fallback;
  } catch {
    return fallback;
  }
}

// ---------------------------------------------------------------------------
// HTTP client
// ---------------------------------------------------------------------------

export const apiClient = {
  get: <T = unknown>(url: string, params?: Record<string, string | number>) =>
    request<T>(url, { method: 'GET', params }),
  post: <T = unknown>(url: string, body?: unknown) =>
    request<T>(url, { method: 'POST', body: JSON.stringify(body) }),
  put: <T = unknown>(url: string, body?: unknown) =>
    request<T>(url, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T = unknown>(url: string) =>
    request<T>(url, { method: 'DELETE' }),
};

// ---------------------------------------------------------------------------
// Domain API modules
// ---------------------------------------------------------------------------

export const scoresApi = {
  getLive: () => apiClient.get('/scores/live'),
  getBySport: (sport: string) => apiClient.get(`/scores/${sport}`),
};

export const newsApi = {
  getTopHeadlines: (limit = 20) =>
    apiClient.get('/news', { limit }),
  getBySport: (sport: string, limit = 15) =>
    apiClient.get(`/news/${sport}`, { limit }),
};

export const teamsApi = {
  getBySport: (sport: string, league: string) =>
    apiClient.get(`/teams/${sport}/${league}`),
  getById: (sport: string, league: string, teamId: string) =>
    apiClient.get(`/teams/${sport}/${league}/${teamId}`),
  getRoster: (sport: string, league: string, teamId: string) =>
    apiClient.get(`/teams/${sport}/${league}/${teamId}/roster`),
};

export const sportsApi = {
  getStandings: (sport: string, league: string) =>
    apiClient.get(`/sports/${sport}/${league}/standings`),
  getSchedule: (sport: string, league: string) =>
    apiClient.get(`/sports/${sport}/${league}/schedule`),
};

export const playersApi = {
  getById: (sport: string, playerId: string) =>
    apiClient.get(`/players/${sport}/${playerId}`),
  getStats: (sport: string, playerId: string) =>
    apiClient.get(`/players/${sport}/${playerId}/stats`),
};

export const authApi = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  register: (email: string, username: string, password: string) =>
    apiClient.post('/auth/register', { email, username, password }),
  getProfile: () => apiClient.get('/auth/profile'),
};

export const fantasyApi = {
  getMyLeagues: () => apiClient.get('/fantasy/leagues'),
  getLeagueStandings: (leagueId: string) =>
    apiClient.get(`/fantasy/leagues/${leagueId}/standings`),
  getMyTeam: (leagueId: string) =>
    apiClient.get(`/fantasy/leagues/${leagueId}/my-team`),
};

export const searchApi = {
  search: (query: string) => apiClient.get('/search', { q: query }),
};

// ---------------------------------------------------------------------------
// Teacher sports API — proxy → direct fallback
// ---------------------------------------------------------------------------

async function withFallback<T = unknown>(
  localPath: string,
  directPath: string,
  method: 'get' | 'post' = 'get',
  body?: unknown,
): Promise<{ data: T }> {
  try {
    return method === 'post'
      ? await apiClient.post<T>(localPath, body)
      : await apiClient.get<T>(localPath);
  } catch {
    return method === 'post'
      ? await apiClient.post<T>(`${API_URLS.TEACHER}${directPath}`, body)
      : await apiClient.get<T>(`${API_URLS.TEACHER}${directPath}`);
  }
}

export const teacherSportsApi = {
  getAllSports: () =>
    withFallback<TeacherSportItem[]>('/sports/provided', '/sports'),

  getSportByUuid: (uuid: string) =>
    withFallback<TeacherSportItem>(`/sports/provided/item/${uuid}`, `/sports/${uuid}`),

  getCategories: () =>
    withFallback<TeacherCategoryItem[]>('/sports/provided/categories', '/categories'),

  getEvents: () =>
    withFallback<TeacherEventItem[]>('/sports/provided/events', '/events'),

  getEventByUuid: (uuid: string) =>
    withFallback<TeacherEventItem>(`/sports/provided/events/${uuid}`, `/events/${uuid}`),

  getComments: (eventUuid: string) =>
    withFallback<TeacherCommentItem[]>(
      `/sports/provided/comments/events/${eventUuid}`,
      `/comments/events/${eventUuid}`,
    ),

  createComment: (eventUuid: string, comment: string) =>
    withFallback<TeacherCommentItem>('/sports/provided/comments', '/comments', 'post', {
      eventUuid,
      comment,
    }),

  getFavorites: () =>
    withFallback<TeacherFavoriteItem[]>('/sports/provided/favorites', '/favorites'),

  createFavorite: (payload: { sportUuid?: string; eventUuid?: string }) =>
    withFallback<TeacherFavoriteItem>('/sports/provided/favorites', '/favorites', 'post', payload),
};
