import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async createTag(data: CreateTagDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${data.userId} not found.`);
    }
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
        userId: true,
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
