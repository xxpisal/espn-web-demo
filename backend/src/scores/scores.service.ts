import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { GameScore, SportType } from '../common/types';

@Injectable()
export class ScoresService {
  private readonly espnApiBase = 'https://site.api.espn.com/apis/site/v2/sports';
  private readonly sportEndpoints: Record<SportType, string> = {
    nfl: 'football/nfl',
    nba: 'basketball/nba',
    mlb: 'baseball/mlb',
    nhl: 'hockey/nhl',
    soccer: 'soccer/usa.1',
    ncaaf: 'football/college-football',
    ncaab: 'basketball/mens-college-basketball',
    f1: 'racing/f1',
    tennis: 'tennis/atp',
    golf: 'golf/pga',
    mma: 'mma/ufc',
  };

  constructor(private httpService: HttpService) {}

  async getScoresBySport(sport: SportType): Promise<GameScore[]> {
    const endpoint = this.sportEndpoints[sport];
    if (!endpoint) return [];

    try {
      const url = `${this.espnApiBase}/${endpoint}/scoreboard`;
      const response = await firstValueFrom(
        this.httpService.get(url, { params: { limit: 20 } }),
      );
      return this.transformEspnScores(response.data, sport);
    } catch (error) {
      console.error(`Failed to fetch scores for ${sport}:`, error.message);
      return this.getMockScores(sport);
    }
  }

  async getAllLiveScores(): Promise<Record<string, GameScore[]>> {
    const sports: SportType[] = ['nfl', 'nba', 'mlb', 'nhl', 'soccer'];
    const results: Record<string, GameScore[]> = {};

    await Promise.allSettled(
      sports.map(async (sport) => {
        results[sport] = await this.getScoresBySport(sport);
      }),
    );

    return results;
  }

  private transformEspnScores(data: any, sport: SportType): GameScore[] {
    const events = data?.events || [];
    return events.map((event: any) => {
      const competition = event.competitions?.[0];
      const homeTeam = competition?.competitors?.find(
        (c: any) => c.homeAway === 'home',
      );
      const awayTeam = competition?.competitors?.find(
        (c: any) => c.homeAway === 'away',
      );
      const status = competition?.status;

      return {
        gameId: event.id,
        sport,
        homeTeam: {
          id: homeTeam?.team?.id || '',
          name: homeTeam?.team?.displayName || '',
          abbreviation: homeTeam?.team?.abbreviation || '',
          score: parseInt(homeTeam?.score || '0'),
          logo: homeTeam?.team?.logo,
          record: homeTeam?.records?.[0]?.summary,
        },
        awayTeam: {
          id: awayTeam?.team?.id || '',
          name: awayTeam?.team?.displayName || '',
          abbreviation: awayTeam?.team?.abbreviation || '',
          score: parseInt(awayTeam?.score || '0'),
          logo: awayTeam?.team?.logo,
          record: awayTeam?.records?.[0]?.summary,
        },
        status: (status?.type?.state as any) || 'pre',
        period: status?.period ? `Q${status.period}` : undefined,
        clock: status?.displayClock,
        venue: competition?.venue?.fullName,
        startTime: event.date,
      };
    });
  }

  private getMockScores(sport: SportType): GameScore[] {
    const mockGames: Partial<Record<SportType, GameScore[]>> = {
      nfl: [
        {
          gameId: 'nfl_mock_1',
          sport: 'nfl',
          homeTeam: {
            id: 'KC',
            name: 'Kansas City Chiefs',
            abbreviation: 'KC',
            score: 24,
            record: '10-2',
          },
          awayTeam: {
            id: 'BUF',
            name: 'Buffalo Bills',
            abbreviation: 'BUF',
            score: 17,
            record: '8-4',
          },
          status: 'in',
          period: 'Q4',
          clock: '3:12',
          startTime: new Date().toISOString(),
        },
      ],
      nba: [
        {
          gameId: 'nba_mock_1',
          sport: 'nba',
          homeTeam: {
            id: 'LAL',
            name: 'Los Angeles Lakers',
            abbreviation: 'LAL',
            score: 108,
            record: '22-15',
          },
          awayTeam: {
            id: 'GSW',
            name: 'Golden State Warriors',
            abbreviation: 'GSW',
            score: 103,
            record: '19-18',
          },
          status: 'post',
          startTime: new Date().toISOString(),
        },
      ],
    };
    return mockGames[sport] || [];
  }
}
