import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SportsModule } from './sports/sports.module';
import { NewsModule } from './news/news.module';
import { ScoresModule } from './scores/scores.module';
import { TeamsModule } from './teams/teams.module';
import { PlayersModule } from './players/players.module';
import { FantasyModule } from './fantasy/fantasy.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    AuthModule,
    UsersModule,
    SportsModule,
    NewsModule,
    ScoresModule,
    TeamsModule,
    PlayersModule,
    FantasyModule,
    SearchModule,
  ],
})
export class AppModule {}
