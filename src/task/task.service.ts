import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    try {
      return await this.prisma.task.create({
        data: createTaskDto
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create task');
    }
  }

  async findAll(): Promise<Task[]> {
    try {
      return await this.prisma.task.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve tasks');
    }
  }

  async findOne(id: number): Promise<Task> {
    try {
      const task = await this.prisma.task.findUnique({
        where: { id }
      });
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      return task;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve task');
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.findOne(id); // Ensure the task exists
    try {
      return await this.prisma.task.update({
        where: { id },
        data: updateTaskDto
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update task');
    }
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Ensure the task exists
    try {
      await this.prisma.task.delete({
        where: { id }
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to remove task');
    }
  }
}
