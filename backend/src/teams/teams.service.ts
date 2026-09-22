import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Team, SportType } from '../common/types';

@Injectable()
export class TeamsService {
  private readonly espnApiBase = 'https://site.api.espn.com/apis/site/v2/sports';

  constructor(private httpService: HttpService) {}

  async getTeamsBySport(sport: SportType, league: string): Promise<Team[]> {
    try {
      const url = `${this.espnApiBase}/${this.getSportPath(sport, league)}/teams`;
      const response = await firstValueFrom(this.httpService.get(url));
      return this.transformEspnTeams(response.data, sport);
    } catch {
      return [];
    }
  }

  async getTeamById(
    sport: SportType,
    league: string,
    teamId: string,
  ): Promise<any> {
    try {
      const url = `${this.espnApiBase}/${this.getSportPath(sport, league)}/teams/${teamId}`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch {
      return null;
    }
  }

  async getTeamRoster(
    sport: SportType,
    league: string,
    teamId: string,
  ): Promise<any> {
    try {
      const url = `${this.espnApiBase}/${this.getSportPath(sport, league)}/teams/${teamId}/roster`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch {
      return null;
    }
  }

  private getSportPath(sport: SportType, league: string): string {
    const paths: Record<SportType, string> = {
      nfl: 'football/nfl',
      nba: 'basketball/nba',
      mlb: 'baseball/mlb',
      nhl: 'hockey/nhl',
      soccer: `soccer/${league}`,
      ncaaf: 'football/college-football',
      ncaab: 'basketball/mens-college-basketball',
      f1: 'racing/f1',
      tennis: 'tennis/atp',
      golf: 'golf/pga',
      mma: 'mma/ufc',
    };
    return paths[sport] || `${sport}/${league}`;
  }

  private transformEspnTeams(data: any, sport: SportType): Team[] {
    const sports = data?.sports || [];
    const leagues = sports?.[0]?.leagues || [];
    const teams = leagues?.[0]?.teams || [];
    return teams.map((t: any) => ({
      id: t.team.id,
      name: t.team.name,
      abbreviation: t.team.abbreviation,
      displayName: t.team.displayName,
      location: t.team.location,
      sport,
      logo: t.team.logos?.[0]?.href,
      color: t.team.color,
      alternateColor: t.team.alternateColor,
    }));
  }
}
