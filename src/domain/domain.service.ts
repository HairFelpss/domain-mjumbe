import { Injectable } from '@nestjs/common';

import { FirebaseRepository } from '../firebase/firebase.repository';

import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';

@Injectable()
export class DomainService {
  constructor(private readonly firebaseRepository: FirebaseRepository) {}
  async create(createDomain: CreateDomainDto, uid: string) {
    try {
      const { purcharse_date, expiration_date } = createDomain;

      const ref = await this.firebaseRepository.getDocumentRef('users', uid);
      return this.firebaseRepository.create(
        'domains',
        {
          ...createDomain,
          purcharse_date: new Date(purcharse_date),
          expiration_date: new Date(expiration_date),
        },
        null,
        ref,
      );
    } catch (err) {
      return err;
    }
  }

  findAll() {
    return `This action returns all domain`;
  }

  findOne(id: number) {
    return `This action returns a #${id} domain`;
  }

  update(id: number, updateDomainDto: UpdateDomainDto) {
    return `This action updates a #${id} domain`;
  }

  remove(id: number) {
    return `This action removes a #${id} domain`;
  }
}
