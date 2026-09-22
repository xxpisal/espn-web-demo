import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SportsService {
  private readonly espnBaseUrl: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.espnBaseUrl = 'https://site.api.espn.com/apis/site/v2/sports';
  }

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
