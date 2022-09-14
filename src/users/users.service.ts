import { Injectable } from '@nestjs/common';

import { FirebaseRepository } from './../firebase/firebase.repository';

import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly firebaseRepository: FirebaseRepository) {}

  async register(user: RegisterUserDto) {
    try {
      const { email, password, name, phone_number, role } = user;

      const userCreated = await this.firebaseRepository.registerUser(
        email,
        password,
        role,
        phone_number,
        name,
      );

      if (userCreated.uid) {
        await this.firebaseRepository.create(
          'users',
          {
            phone_number,
            email,
            name,
          },
          userCreated.uid,
        );

        return `user created ${userCreated.email}`;
      }

      return userCreated;
    } catch (err) {
      return err.message;
    }
  }

  async getUserById(id: string) {
    return this.firebaseRepository.getById('users', id);
  }
}
