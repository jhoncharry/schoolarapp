import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { AuthRegisterSchema } from './schema/authRegister.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "AuthRegister", schema: AuthRegisterSchema }])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule { }
