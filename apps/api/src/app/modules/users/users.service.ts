import { User } from '@prisma/client';
import { PrismaService } from 'packages/api/prisma/src';

export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users;
  }
}
