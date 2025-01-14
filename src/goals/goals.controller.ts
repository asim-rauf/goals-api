import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpCode } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { STATUS_CODES } from 'http';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}
  @HttpCode(201)
  @Post()
  async create(@Body(new ValidationPipe()) createGoalDto: CreateGoalDto) {
    try {
      await this.goalsService.create(createGoalDto);
      return {
        success: true,
        message: 'Goal created successfully',
        code: STATUS_CODES.OK
      };
    } catch (error) {
      return error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.goalsService.findAll();
    } catch (error) {
      return error;
    }
  }
  @Get('user/:userId')
  async findAllByUserId(@Param('userId') userId: string) {
    try {
      return await this.goalsService.findAllByUserId(userId);
    } catch (error) {
      return error;
    }
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const goal = await this.goalsService.findOne(+id);

      return goal;
    } catch (error) {
      return error;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGoalDto: UpdateGoalDto) {
    try {
      return await this.goalsService.update(+id, updateGoalDto);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.goalsService.remove(+id);
    } catch (error) {
      return error;
    }
  }
}
