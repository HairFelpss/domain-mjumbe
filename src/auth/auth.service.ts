import { Injectable, Patch } from '@nestjs/common';

import { RolesAllowed } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/constants/Roles';

import { FirebaseRepository } from './../firebase/firebase.repository';

import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseRepository: FirebaseRepository) {}

  Authenticate(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;

    return this.firebaseRepository.Authenticate(email, password);
  }

  @Patch(':id')
  @RolesAllowed(Roles.USER)
  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  /*async updateUserFcmToken(
    updateFcmTokenDto: UpdateFcmTokenDto,
  ): Promise<IUser> {
    const userEntity = await this.firebaseRepository.getUser();
    userEntity['fcmToken'] = updateFcmTokenDto.fcmToken;

    return this.save(userEntity);
  }*/
}
