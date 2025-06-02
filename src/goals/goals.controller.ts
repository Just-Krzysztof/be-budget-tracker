import {
  Body,
  Controller,
  HttpCode,
  Post,
  Put,
  Param,
  Get,
} from '@nestjs/common';
import { GoalsService } from './goals.service';
import { CreateGoalsDto } from './dto/create-goals.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
@UseGuards(JwtAuthGuard)
@Controller('goals')
export class GoalsController {
  constructor(private readonly goalService: GoalsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() data: CreateGoalsDto) {
    return this.goalService.createGoals(data);
  }

  @Put(':id/current-amount')
  @HttpCode(200)
  updateCurrentAmount(
    @Param('id') id: string,
    @Body() data: { amount: number },
  ) {
    return this.goalService.updateGoalCurrentAmount(id, data.amount);
  }

  @Get('list/:userId')
  async findAll(@Param('userId') userId: string) {
    return this.goalService.getUserGoals(userId);
  }
  // @Get('list')
  // async findAll(@Query('userId') userId: string) {
  //   return this.goalService.getUserGoals(userId);
  // }
}
