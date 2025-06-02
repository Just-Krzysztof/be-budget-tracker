import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post('create')
  create(@Body() data: CreateTagDto) {
    return this.tagService.createTag(data);
  }

  @Get('list')
  getTagList() {
    return this.tagService.getTagList();
  }
}
