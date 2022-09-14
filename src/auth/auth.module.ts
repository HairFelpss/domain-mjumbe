import { HttpModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseAuthStrategy } from './strategies/firebase-auth.strategy';
import { FirebaseRepository } from 'src/firebase/firebase.repository';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule, HttpModule],
  providers: [AuthService, FirebaseAuthStrategy, FirebaseRepository],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
