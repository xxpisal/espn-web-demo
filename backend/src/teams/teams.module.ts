import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';

@Module({
  imports: [HttpModule],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
