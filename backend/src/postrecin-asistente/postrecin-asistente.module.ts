import { Module } from '@nestjs/common';
import { PostrecinAsistenteController } from './postrecin-asistente.controller';
import { PostrecinAsistenteService } from './postrecin-asistente.service';

@Module({
  controllers: [PostrecinAsistenteController],
  providers: [PostrecinAsistenteService],
})
export class PostrecinAsistenteModule {}
