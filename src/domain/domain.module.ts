import { Module } from '@nestjs/common';
import { FirebaseRepository } from 'src/firebase/firebase.repository';

import { DomainService } from './domain.service';
import { DomainController } from './domain.controller';

@Module({
  controllers: [DomainController],
  providers: [DomainService, FirebaseRepository],
})
export class DomainModule {}
