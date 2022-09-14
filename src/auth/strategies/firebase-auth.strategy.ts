import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// noinspection TypeScriptCheckImport
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';

import { FirebaseRepository } from '../../firebase/firebase.repository';

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(
  Strategy,
  'firebase-auth',
) {
  constructor(
    private readonly reflector: Reflector,
    private readonly firebaseRepository: FirebaseRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(token) {
    const firebaseUser: any = this.firebaseRepository
      .getAuth()
      .verifyIdToken(token, true)
      .catch(err => {
        throw new UnauthorizedException(err.message);
      });

    /// RETORNAR O USUARIO DO FIREBASE AQUI
    //return this.authRepository.findUserByFirebaseUid(firebaseUser.uid);
  }
}
