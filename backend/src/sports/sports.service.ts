import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SportsService {
  private readonly espnBaseUrl: string;
  private readonly teacherApiBase: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.espnBaseUrl = 'https://site.api.espn.com/apis/site/v2/sports';
    this.teacherApiBase = 'https://sport-api.eunglyzhia.com/api/v1';
  }

  // Teacher provided API integration
  async getProvidedSports() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.teacherApiBase}/sports`, { timeout: 8000 }),
      );
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getProvidedSportByUuid(uuid: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.teacherApiBase}/sports/${uuid}`, { timeout: 8000 }),
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async getProvidedCategories() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.teacherApiBase}/categories`, { timeout: 8000 }),
      );
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getProvidedCategoryByUuid(uuid: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.teacherApiBase}/sport_categories/${uuid}`, { timeout: 8000 }),
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async getProvidedEvents() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.teacherApiBase}/events`, { timeout: 8000 }),
      );
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getProvidedEventByUuid(uuid: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.teacherApiBase}/events/${uuid}`, { timeout: 8000 }),
      );
      return response.data;
    } catch (error) {
      return null;
    }
  }

  async getProvidedComments(eventUuid: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.teacherApiBase}/comments/events/${eventUuid}`, { timeout: 8000 }),
      );
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async createProvidedComment(dto: { eventUuid: string; comment: string }) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.teacherApiBase}/comments`, dto, {
          headers: { 'Content-Type': 'application/json' },
          timeout: 8000,
        }),
      );
      return response.data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getProvidedFavorites() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.teacherApiBase}/favorites`, { timeout: 8000 }),
      );
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async createProvidedFavorite(dto: { sportUuid?: string; eventUuid?: string }) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.teacherApiBase}/favorites`, dto, {
          headers: { 'Content-Type': 'application/json' },
          timeout: 8000,
        }),
      );
      return response.data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async deleteProvidedFavorite(uuid: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`${this.teacherApiBase}/favorites/${uuid}`, { timeout: 8000 }),
      );
      return response.data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Classic ESPN endpoints
  async getLeagueStandings(sport: string, league: string) {
    try {
      const url = `${this.espnBaseUrl}/${sport}/${league}/standings`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      return this.getMockStandings(sport, league);
    }
  }

  async getLeagueSchedule(sport: string, league: string) {
    try {
      const url = `${this.espnBaseUrl}/${sport}/${league}/scoreboard`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      return this.getMockSchedule(sport, league);
    }
  }

  private getMockStandings(sport: string, league: string) {
    return {
      sport,
      league,
      standings: [
        { rank: 1, team: 'Kansas City Chiefs', wins: 10, losses: 2, pct: 0.833 },
        { rank: 2, team: 'Miami Dolphins', wins: 8, losses: 4, pct: 0.667 },
        { rank: 3, team: 'Baltimore Ravens', wins: 8, losses: 4, pct: 0.667 },
        { rank: 4, team: 'Dallas Cowboys', wins: 7, losses: 5, pct: 0.583 },
      ],
    };
  }

  private getMockSchedule(sport: string, league: string) {
    return {
      sport,
      league,
      games: [],
    };
  }
}

