import { Module } from '@nestjs/common';
import { SushoAsistenteModule } from './susho-asistente/susho-asistente.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [SushoAsistenteModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
