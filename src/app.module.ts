import { Module } from '@nestjs/common';
import { GoalsModule } from './goals/goals.module';
import { TaskModule } from './task/task.module';
import { PrismaService } from './prisma/prisma.service';
import { WebhookModule } from './webhook/webhook.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [GoalsModule, TaskModule, WebhookModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [PrismaService]
})
export class AppModule {}
AbortController;
