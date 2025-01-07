import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Goal, Prisma } from '@prisma/client';

@Injectable()
export class GoalsService {
  constructor(private prisma: PrismaService) {}

  async create(createGoalDto: CreateGoalDto): Promise<Goal> {
    try {
      return this.prisma.goal.create({
        data: createGoalDto
      });
    } catch (error) {
      throw new HttpException('Failed to create goal', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Goal[]> {
    try {
      return this.prisma.goal.findMany();
    } catch (error) {
      throw new HttpException('Failed to retrieve goals', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number): Promise<Goal | null> {
    try {
      const goal = await this.prisma.goal.findUnique({
        where: { id }
      });
      if (!goal) {
        throw new HttpException('Goal not found', HttpStatus.NOT_FOUND);
      }
      return goal;
    } catch (error) {
      throw new HttpException('Failed to retrieve goal', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateGoalDto: UpdateGoalDto): Promise<Goal> {
    try {
      return this.prisma.goal.update({
        where: { id },
        data: updateGoalDto
      });
    } catch (error) {
      throw new HttpException('Failed to update goal', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number): Promise<Goal> {
    try {
      return this.prisma.goal.delete({
        where: { id }
      });
    } catch (error) {
      throw new HttpException('Failed to delete goal', HttpStatus.BAD_REQUEST);
    }
  }
}
