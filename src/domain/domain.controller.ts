import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DomainService } from './domain.service';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';

import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RolesAllowed } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/constants/Roles';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Domains')
@Controller('/domain')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@RolesAllowed(Roles.ADMIN)
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Post(':id')
  @Public()
  create(@Param('id') id: string, @Body() createDomainDto: CreateDomainDto) {
    return this.domainService.create(createDomainDto, id);
  }

  @Get()
  findAll() {
    return this.domainService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.domainService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDomainDto: UpdateDomainDto) {
    return this.domainService.update(+id, updateDomainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.domainService.remove(+id);
  }
}
