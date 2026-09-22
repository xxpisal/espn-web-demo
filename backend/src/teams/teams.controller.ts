import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TeamsService } from './teams.service';
import { SportType } from '../common/types';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get(':sport/:league')
  @ApiOperation({ summary: 'Get all teams for a sport/league' })
  getTeams(
    @Param('sport') sport: SportType,
    @Param('league') league: string,
  ) {
    return this.teamsService.getTeamsBySport(sport, league);
  }

  @Get(':sport/:league/:teamId')
  @ApiOperation({ summary: 'Get team details' })
  getTeam(
    @Param('sport') sport: SportType,
    @Param('league') league: string,
    @Param('teamId') teamId: string,
  ) {
    return this.teamsService.getTeamById(sport, league, teamId);
  }

  @Get(':sport/:league/:teamId/roster')
  @ApiOperation({ summary: 'Get team roster' })
  getTeamRoster(
    @Param('sport') sport: SportType,
    @Param('league') league: string,
    @Param('teamId') teamId: string,
  ) {
    return this.teamsService.getTeamRoster(sport, league, teamId);
  }
}
