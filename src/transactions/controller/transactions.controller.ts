import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { parsePhoneNumber } from 'libphonenumber-js';
//import { CartsService } from 'src/carts/service/carts.service';
import { validBody } from '../helpers/valid-boyd';
import { Billing } from '../model/billing.type';
import { CreateTransactionDto } from '../model/create-transaction.dto';
import { CreditCard } from '../model/creditCard.type';
import { Customer } from '../model/customer.type';
import { TransactionsService } from '../service/transactions.service';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';

import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RolesAllowed } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/constants/Roles';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Transactions')
@Controller('transactions')
@UseGuards(FirebaseAuthGuard, RolesGuard)
@RolesAllowed(Roles.USER)
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService, //private readonly cartService: CartsService,
  ) {}

  @Post()
  async create(@Body() body: CreateTransactionDto): Promise<any> {
    try {
      const isValid = await validBody(body);
      if (!isValid) return new BadRequestException('Error on validate schema');

      //const cart = await this.cartService.findOne(body.cartId);
      const cart = {
        id:
          'ID TEM QUE PEGAR DA COMPRA CRIADA QUANDO O CARA FOR PAGAR, SE LIGOU',
      };
      if (!cart) return new NotFoundException('Cart not found');

      const customer: Customer = {
        name: body.customerName,
        email: body.customerEmail,
        mobile: parsePhoneNumber(body.customerMobile, 'BR').format('E.164'),
        document: body.customerDocument,
      };

      const billing: Billing = {
        address: body.billingAddress,
        number: body.billingNumber,
        neighborhood: body.billingNeighborhood,
        city: body.billingCity,
        state: body.billingState,
        zipCode: body.billingZipCode,
      };

      const creditCard: CreditCard = {
        number: body.creditCardNumber,
        expiration: body.creditCardExpiration,
        holderName: body.creditCardHolderName,
        cvv: body.creditCardCvv,
      };

      return await this.transactionsService.process(
        cart.id,
        body.paymentType,
        Number(body.installments),
        customer,
        billing,
        creditCard,
      );
    } catch (e) {
      console.log(e);
    }
  }

  @Get()
  async getTransactionsFromProvider() {
    return await this.transactionsService.getTransactionsFromProvider();
  }
}
