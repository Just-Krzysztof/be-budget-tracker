import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async createTag(data: CreateTagDto) {
    const existingTag = await this.prisma.tag.findFirst({
      where: {
        name: data.name,
      },
    });

    if (existingTag) {
      throw new ConflictException(
        `Tag with name ${data.name} already existing`,
      );
    }

    return this.prisma.tag.create({
      data,
      select: {
        name: true,
        colorBg: true,
        colorText: true,
      },
    });
  }

  async getTagList() {
    const tags = await this.prisma.tag.findMany();

    return {
      tags,
    };
  }
}
