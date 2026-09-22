export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export type SportType =
  | 'nfl'
  | 'nba'
  | 'mlb'
  | 'nhl'
  | 'soccer'
  | 'ncaaf'
  | 'ncaab'
  | 'f1'
  | 'tennis'
  | 'golf'
  | 'mma';

export interface GameScore {
  gameId: string;
  sport: SportType;
  homeTeam: TeamScore;
  awayTeam: TeamScore;
  status: GameStatus;
  period?: string;
  clock?: string;
  venue?: string;
  startTime: string;
}

export interface TeamScore {
  id: string;
  name: string;
  abbreviation: string;
  score: number;
  logo?: string;
  record?: string;
}

export type GameStatus = 'pre' | 'in' | 'post';

export interface NewsArticle {
  id: string;
  headline: string;
  description: string;
  story?: string;
  images?: ArticleImage[];
  published: string;
  sport?: SportType;
  categories?: string[];
  links?: { web: { href: string } };
  source?: string;
}

export interface ArticleImage {
  id?: number;
  name?: string;
  url: string;
  height?: number;
  width?: number;
  caption?: string;
}

export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  displayName: string;
  location: string;
  sport: SportType;
  league?: string;
  logo?: string;
  color?: string;
  alternateColor?: string;
  record?: TeamRecord;
}

export interface TeamRecord {
  wins: number;
  losses: number;
  ties?: number;
  percentage?: number;
}

export interface Player {
  id: string;
  fullName: string;
  displayName: string;
  shortName: string;
  position?: string;
  jersey?: string;
  team?: Partial<Team>;
  sport: SportType;
  headshot?: string;
  stats?: Record<string, any>;
}
