import IBase from 'src/core/base.interface';

import { IsDate, IsEmail, IsString, IsFQDN } from 'class-validator';
import { Type } from 'class-transformer';

export class DomainEntity extends IBase {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly nickname: string;

  @IsFQDN()
  readonly domain: string;

  @IsString({ each: true })
  phone_number: string[] = [];

  @Type(() => Date)
  @IsDate()
  readonly purcharse_date: Date;

  @Type(() => Date)
  @IsDate()
  readonly expiration_date: Date;
}
