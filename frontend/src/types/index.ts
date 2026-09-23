export type SportType = 'nfl' | 'nba' | 'mlb' | 'nhl' | 'soccer' | 'football' | 'ncaaf' | 'ncaab' | 'f1' | 'tennis' | 'golf' | 'mma';

export interface NavSport {
  id: SportType | string;
  label: string;
  path: string;
  icon?: string;
}

export interface GameScore {
  gameId: string;
  sport: SportType;
  homeTeam: TeamScore;
  awayTeam: TeamScore;
  status: 'pre' | 'in' | 'post';
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
  url: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  displayName: string;
  location: string;
  sport: SportType;
  logo?: string;
  color?: string;
  alternateColor?: string;
  record?: { wins: number; losses: number; ties?: number };
}

export interface Player {
  id: string;
  fullName: string;
  displayName: string;
  position?: string;
  jersey?: string;
  team?: Partial<Team>;
  sport: SportType;
  headshot?: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  favoriteSports: string[];
  favoriteTeams: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface StandingEntry {
  rank: number;
  team: string;
  abbreviation?: string;
  wins: number;
  losses: number;
  ties?: number;
  pct?: number;
  logo?: string;
}

export interface FantasyLeague {
  id: string;
  name: string;
  sport: string;
  season: number;
  members: number;
  myRank?: number;
  myScore?: number;
}

export interface TeacherSportItem {
  id: number;
  uuid: string;
  name: string;
  category?: {
    name: string;
  };
  description: string;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
  disabled?: boolean;
}

export interface TeacherCategoryItem {
  id: number;
  uuid: string;
  name: string;
  description?: string | null;
  events?: TeacherEventItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface TeacherEventItem {
  id: number;
  uuid: string;
  name: string;
  description: string;
  category?: {
    name: string;
  };
  categoryName?: string;
  imageUrls: string[];
  locationName?: string;
  latitude?: number;
  longitude?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type SportDetailItem = TeacherSportItem | TeacherEventItem;

export interface TeacherCommentItem {
  id?: number;
  uuid?: string;
  eventUuid: string;
  comment: string;
  createdAt?: string;
}

export interface TeacherFavoriteItem {
  id?: string;
  uuid?: string | null;
  sportUuid?: string;
  eventUuid?: string;
  isDeleted?: boolean;
  isFavorite?: boolean;
}
