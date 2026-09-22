import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user' })
  async getMe(@Request() req: any) {
    const user = await this.usersService.findById(req.user.id);
    const { password: _pw, ...result } = user;
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Put('favorites')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user favorites' })
  async updateFavorites(
    @Request() req: any,
    @Body() body: { favoriteSports: string[]; favoriteTeams: string[] },
  ) {
    return this.usersService.updateFavorites(
      req.user.id,
      body.favoriteSports,
      body.favoriteTeams,
    );
  }
}
