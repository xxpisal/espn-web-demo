import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PlayersService } from './players.service';
import { SportType } from '../common/types';

@ApiTags('players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get(':sport/:playerId')
  @ApiOperation({ summary: 'Get player details' })
  getPlayer(
    @Param('sport') sport: SportType,
    @Param('playerId') playerId: string,
  ) {
    return this.playersService.getPlayerById(sport, playerId);
  }

  @Get(':sport/:playerId/stats')
  @ApiOperation({ summary: 'Get player statistics' })
  getPlayerStats(
    @Param('sport') sport: SportType,
    @Param('playerId') playerId: string,
  ) {
    return this.playersService.getPlayerStats(sport, playerId);
  }
}
