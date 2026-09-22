import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SportType } from '../common/types';

@Injectable()
export class PlayersService {
  private readonly espnApiBase = 'https://site.api.espn.com/apis/site/v2/sports';

  constructor(private httpService: HttpService) {}

  async getPlayerById(sport: SportType, playerId: string): Promise<any> {
    try {
      const sportPath = this.getSportPath(sport);
      const url = `${this.espnApiBase}/${sportPath}/athletes/${playerId}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch {
      return null;
    }
  }

  async getPlayerStats(sport: SportType, playerId: string): Promise<any> {
    try {
      const sportPath = this.getSportPath(sport);
      const url = `${this.espnApiBase}/${sportPath}/athletes/${playerId}/statistics`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch {
      return null;
    }
  }

  private getSportPath(sport: SportType): string {
    const paths: Record<SportType, string> = {
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
    return paths[sport];
  }
}
