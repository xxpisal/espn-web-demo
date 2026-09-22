import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ScoresService } from './scores.service';
import { SportType } from '../common/types';

@ApiTags('scores')
@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Get('live')
  @ApiOperation({ summary: 'Get all live scores across sports' })
  getAllLive() {
    return this.scoresService.getAllLiveScores();
  }

  @Get(':sport')
  @ApiOperation({ summary: 'Get live scores for a specific sport' })
  getScoresBySport(@Param('sport') sport: SportType) {
    return this.scoresService.getScoresBySport(sport);
  }
}
