import { HttpModule, Module, DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { DomainModule } from './domain/domain.module';

import { UsersModule } from './users/users.module';
import { AppService } from './app.service';
import { NotificationsModule } from './notifications/notifications.module';
import { MailModule } from './mail/mail.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    HttpModule,
    NotificationsModule,
    MailModule,
    DomainModule,
    TransactionsModule,
  ],
  providers: [AppService],
})
export class AppModule {}
