import IBase from '../core/base.interface';

import { IsDate, IsEnum, IsEmail, IsString, ValidateIf } from 'class-validator';

import { Roles } from 'src/constants/Roles';

export class UserEntity extends IBase {
  @IsEmail()
  email: string;

  emailVerified: boolean = false;

  @IsString()
  emailVerificationToken: string;

  @IsString()
  username: string;

  @IsEnum(Roles)
  role: Roles.USER;

  @IsString()
  name: string;

  @IsString()
  phone_number: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  fcmToken!: string | null;

  @IsDate()
  creation_date: Date;

  @IsDate()
  update_date: Date;
}
