import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SportsService } from './sports.service';

@ApiTags('sports')
@Controller('sports')
export class SportsController {
  constructor(private readonly sportsService: SportsService) {}

  // Teacher provided API routes
  @Get('provided')
  @ApiOperation({ summary: 'Get all sports from teacher API' })
  getProvidedSports() {
    return this.sportsService.getProvidedSports();
  }

  @Get('provided/item/:uuid')
  @ApiOperation({ summary: 'Get single sport by UUID from teacher API' })
  getProvidedSportByUuid(@Param('uuid') uuid: string) {
    return this.sportsService.getProvidedSportByUuid(uuid);
  }

  @Get('provided/categories')
  @ApiOperation({ summary: 'Get all categories from teacher API' })
  getProvidedCategories() {
    return this.sportsService.getProvidedCategories();
  }

  @Get('provided/category/:uuid')
  @ApiOperation({ summary: 'Get category by UUID from teacher API' })
  getProvidedCategoryByUuid(@Param('uuid') uuid: string) {
    return this.sportsService.getProvidedCategoryByUuid(uuid);
  }

  @Get('provided/events')
  @ApiOperation({ summary: 'Get all events from teacher API' })
  getProvidedEvents() {
    return this.sportsService.getProvidedEvents();
  }

  @Get('provided/events/:uuid')
  @ApiOperation({ summary: 'Get event by UUID from teacher API' })
  getProvidedEventByUuid(@Param('uuid') uuid: string) {
    return this.sportsService.getProvidedEventByUuid(uuid);
  }

  @Get('provided/comments/events/:uuid')
  @ApiOperation({ summary: 'Get comments for event from teacher API' })
  getProvidedComments(@Param('uuid') uuid: string) {
    return this.sportsService.getProvidedComments(uuid);
  }

  @Post('provided/comments')
  @ApiOperation({ summary: 'Create comment on event in teacher API' })
  createProvidedComment(@Body() body: { eventUuid: string; comment: string }) {
    return this.sportsService.createProvidedComment(body);
  }

  @Get('provided/favorites')
  @ApiOperation({ summary: 'Get favorites from teacher API' })
  getProvidedFavorites() {
    return this.sportsService.getProvidedFavorites();
  }

  @Post('provided/favorites')
  @ApiOperation({ summary: 'Create favorite in teacher API' })
  createProvidedFavorite(@Body() body: { sportUuid?: string; eventUuid?: string }) {
    return this.sportsService.createProvidedFavorite(body);
  }

  @Delete('provided/favorites/:uuid')
  @ApiOperation({ summary: 'Delete favorite from teacher API' })
  deleteProvidedFavorite(@Param('uuid') uuid: string) {
    return this.sportsService.deleteProvidedFavorite(uuid);
  }

  // Standings and schedules
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

