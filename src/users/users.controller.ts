import { Controller, Get, Post, UseGuards, Param, Body } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RolesAllowed } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/constants/Roles';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { RegisterUserDto } from './dto/register-user.dto';

@ApiTags('Users')
@Controller('/users')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@RolesAllowed(Roles.ADMIN)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  register(@Body() body: RegisterUserDto) {
    return this.usersService.register(body);
  }

  @Get(':id')
  @Public()
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }
}
