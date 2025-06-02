import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { GoalsService } from './goals/goals.service';
import { GoalsController } from './goals/goals.controller';
import { TagService } from './tag/tag.service';
import { TagController } from './tag/tag.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, TransactionModule, AuthModule],
  controllers: [AppController, GoalsController, TagController],
  providers: [AppService, PrismaService, GoalsService, TagService],
  exports: [PrismaService],
})
export class AppModule {}
