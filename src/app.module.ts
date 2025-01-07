import { Module } from '@nestjs/common';
import { GoalsModule } from './goals/goals.module';
import { TaskModule } from './task/task.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [GoalsModule, TaskModule],
  controllers: [],
  providers: [PrismaService]
})
export class AppModule {}
