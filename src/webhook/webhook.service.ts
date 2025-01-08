import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';

@Injectable()
export class WebhookService {
  constructor(private prisma: PrismaService) {}

  async create(createWebhookDto: CreateWebhookDto): Promise<any> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: createWebhookDto.email }
      });

      if (existingUser) {
        throw new NotFoundException('User already exists');
      }

      const createdUser = await this.prisma.user.create({
        data: createWebhookDto
      });

      return createdUser;
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }
}
