import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RolesAllowed } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/constants/Roles';
import { Public } from './decorators/public.decorator';

@ApiTags('Auth')
@Controller('/Auth')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@RolesAllowed(Roles.ADMIN)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Public()
  Authenticate(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.Authenticate(createAuthDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  /*@Put('/fcmToken')
  @RolesAllowed(Roles.USER)
  updateFcmToken(
    @GetUser() userDto: IUser,
    @Body() updateFcmTokenDto: UpdateFcmTokenDto,
  ) {
    return this.authService.updateUserFcmToken(userDto, updateFcmTokenDto);
  }*/
}
