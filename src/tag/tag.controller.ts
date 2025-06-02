import { Controller, Post, Body, Get } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';

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
