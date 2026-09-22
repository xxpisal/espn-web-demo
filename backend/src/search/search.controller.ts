import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { SearchService } from './search.service';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: 'Search for teams, players, and news' })
  @ApiQuery({ name: 'q', required: true, type: String })
  search(@Query('q') query: string) {
    return this.searchService.search(query);
  }
}
