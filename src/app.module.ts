import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { GoalsService } from './goals/goals.service';
import { GoalsController } from './goals/goals.controller';

@Module({
  imports: [UserModule, TransactionModule],
  controllers: [AppController, GoalsController],
  providers: [AppService, PrismaService, GoalsService],
  exports: [PrismaService],
})
export class AppModule {}
