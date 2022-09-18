import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Payment } from './payment';

export class CreateTransactionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cartId: string;

  @ApiProperty()
  @IsNotEmpty()
  paymentType: Payment;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  installments: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  customerEmail: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  customerMobile: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  customerDocument: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  billingAddress: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  billingNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  billingNeighborhood: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  billingCity: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  billingState: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  billingZipCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  creditCardNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  creditCardExpiration: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  creditCardHolderName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  creditCardCvv: string;
}
