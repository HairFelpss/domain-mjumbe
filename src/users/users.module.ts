import { HttpModule, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FirebaseRepository } from './../firebase/firebase.repository';

@Module({
  imports: [HttpModule],
  providers: [UsersService, FirebaseRepository],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
