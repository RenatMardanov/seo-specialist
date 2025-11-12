import { Global, Module } from '@nestjs/common';
import { PrismaService } from '@seo-specialist/prisma';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
