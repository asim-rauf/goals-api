import { Module } from '@nestjs/common';
import { GoalsModule } from './goals/goals.module';
import { TaskModule } from './task/task.module';
import { WebhookModule } from './webhook/webhook.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [GoalsModule, TaskModule, WebhookModule, ConfigModule.forRoot({ isGlobal: true }), PrismaModule],
  controllers: []
})
export class AppModule {}
