import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:admin123@localhost:27017/appdb?authSource=admin'),
    AuthModule,
  ],
})
export class AppModule { }