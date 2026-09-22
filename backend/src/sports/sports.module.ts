import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SportsController } from './sports.controller';
import { SportsService } from './sports.service';

@Module({
  imports: [HttpModule],
  controllers: [SportsController],
  providers: [SportsService],
  exports: [SportsService],
})
export class SportsModule {}
