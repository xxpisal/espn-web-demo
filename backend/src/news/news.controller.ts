import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { SportType } from '../common/types';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiOperation({ summary: 'Get top headlines across all sports' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  getTopHeadlines(@Query('limit') limit?: number) {
    return this.newsService.getTopHeadlines(limit ? Number(limit) : 20);
  }

  @Get(':sport')
  @ApiOperation({ summary: 'Get news for a specific sport' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  getNewsBySport(
    @Param('sport') sport: SportType,
    @Query('limit') limit?: number,
  ) {
    return this.newsService.getNewsBySport(sport, limit ? Number(limit) : 15);
  }
}
