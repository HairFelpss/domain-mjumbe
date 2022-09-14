import { ApiProperty } from '@nestjs/swagger';

import { IsDate, IsEmail, IsString, IsFQDN } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDomainDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly nickname: string;

  @ApiProperty()
  @IsFQDN()
  readonly domain: string;

  @ApiProperty()
  @IsString({ each: true })
  phone_number: string[] = [];

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  readonly purcharse_date: Date;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  readonly expiration_date: Date;
}
