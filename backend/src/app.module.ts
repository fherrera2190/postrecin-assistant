import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SeedModule } from './seed/seed.module';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfiguration } from './config/app.config';
import { OrdersModule } from './orders/orders.module';
import { PostrecinAsistenteModule } from './postrecin-asistente/postrecin-asistente.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
    }),
    MongooseModule.forRoot(EnvConfiguration().mongodb),
    PostrecinAsistenteModule,
    SeedModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
