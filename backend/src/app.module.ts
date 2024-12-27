import { Module } from '@nestjs/common';
import { SushoAsistenteModule } from './susho-asistente/susho-asistente.module';
import { ConfigModule } from '@nestjs/config';
import { SeedModule } from './seed/seed.module';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfiguration } from './config/app.config';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    SushoAsistenteModule,
    ConfigModule.forRoot({
      load: [EnvConfiguration],
    }),
    MongooseModule.forRoot(EnvConfiguration().mongodb),
    SeedModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
