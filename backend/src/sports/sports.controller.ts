import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SportsService } from './sports.service';

@ApiTags('sports')
@Controller('sports')
export class SportsController {
  constructor(private readonly sportsService: SportsService) {}

  @Get(':sport/:league/standings')
  @ApiOperation({ summary: 'Get standings for a sport/league' })
  getStandings(
    @Param('sport') sport: string,
    @Param('league') league: string,
  ) {
    return this.sportsService.getLeagueStandings(sport, league);
  }

  @Get(':sport/:league/schedule')
  @ApiOperation({ summary: 'Get schedule for a sport/league' })
  getSchedule(
    @Param('sport') sport: string,
    @Param('league') league: string,
  ) {
    return this.sportsService.getLeagueSchedule(sport, league);
  }
}
