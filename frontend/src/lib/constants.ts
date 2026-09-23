/**
 * Storage keys — centralised so renaming never misses a callsite.
 */
export const STORAGE_KEYS = {
  TOKEN: 'espn_token',
  THEME: 'espn_theme',
  AUTH: 'espn-auth',
} as const;

/**
 * External API endpoints.
 */
export const API_URLS = {
  LOCAL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1',
  TEACHER: 'https://sport-api.eunglyzhia.com/api/v1',
} as const;

/**
 * Human-readable sport names keyed by slug.
 */
export const SPORT_DISPLAY_NAMES: Record<string, string> = {
  football: 'Football',
  boxing: 'Boxing',
  tennis: 'Tennis',
  cycling: 'Cycling',
  swimming: 'Swimming',
  running: 'Running',
  racing: 'Racing',
  volleyball: 'Volleyball',
  chess: 'Chess',
  nfl: 'NFL',
  nba: 'NBA',
  mlb: 'MLB',
  nhl: 'NHL',
  soccer: 'Soccer',
  ncaaf: 'College Football',
  ncaab: 'College Basketball',
  f1: 'Formula 1',
  golf: 'Golf',
  mma: 'MMA',
};

/**
 * Brand colour per sport slug — used for badges and accent lines.
 */
export const SPORT_COLORS: Record<string, string> = {
  football: '#da020e',
  f1: '#e10600',
  nba: '#1d428a',
  tennis: '#008751',
  boxing: '#990000',
  cycling: '#d97706',
  swimming: '#2563eb',
  running: '#ea580c',
  racing: '#7c3aed',
  volleyball: '#db2777',
  chess: '#27272a',
  default: '#cc0000',
};

/**
 * Colour per sport used inside badge pills (right-rail headlines, etc.).
 */
export const SPORT_BADGE_COLORS: Record<string, string> = {
  Football: '#CC0000',
  NFL: '#013369',
  F1: '#e10600',
  NBA: '#1d428a',
  Tennis: '#008751',
  Olympics: '#0067C5',
  Sports: '#555555',
};

/**
 * Placeholder images for when a sport/event has no image URL.
 */
export const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&q=80',
  'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80',
  'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80',
] as const;

export const FALLBACK_IMAGE = FALLBACK_IMAGES[0];

/**
 * Scores ticker auto-refresh interval in milliseconds.
 */
export const SCORES_REFETCH_INTERVAL_MS = 30_000;
