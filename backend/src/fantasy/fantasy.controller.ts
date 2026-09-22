import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FantasyService } from './fantasy.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('fantasy')
@Controller('fantasy')
export class FantasyController {
  constructor(private readonly fantasyService: FantasyService) {}

  @UseGuards(JwtAuthGuard)
  @Get('leagues')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my fantasy leagues' })
  getMyLeagues(@Request() req: any) {
    return this.fantasyService.getMyLeagues(req.user.id);
  }

  @Get('leagues/:leagueId/standings')
  @ApiOperation({ summary: 'Get league standings' })
  getLeagueStandings(@Param('leagueId') leagueId: string) {
    return this.fantasyService.getLeagueStandings(leagueId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('leagues/:leagueId/my-team')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get my fantasy team' })
  getMyTeam(@Param('leagueId') leagueId: string, @Request() req: any) {
    return this.fantasyService.getMyTeam(leagueId, req.user.id);
  }
}
