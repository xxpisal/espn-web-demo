import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ScoresController } from './scores.controller';
import { ScoresService } from './scores.service';

@Module({
  imports: [HttpModule],
  controllers: [ScoresController],
  providers: [ScoresService],
})
export class ScoresModule {}
