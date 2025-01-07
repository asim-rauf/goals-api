import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, NotFoundException } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  create(@Body(new ValidationPipe()) createGoalDto: CreateGoalDto) {
    return this.goalsService.create(createGoalDto);
  }

  @Get()
  findAll() {
    return this.goalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goalsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoalDto: UpdateGoalDto) {
    return this.goalsService.update(+id, updateGoalDto);
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.goalsService.remove(+id);
  }
}
