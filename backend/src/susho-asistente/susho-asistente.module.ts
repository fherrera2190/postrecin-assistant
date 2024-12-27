import { Module } from '@nestjs/common';
import { SushoAsistenteService } from './susho-asistente.service';
import { SushoAsistenteController } from './susho-asistente.controller';

@Module({
  controllers: [SushoAsistenteController],
  providers: [SushoAsistenteService],
})
export class SushoAsistenteModule {}
