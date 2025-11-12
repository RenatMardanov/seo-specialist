import { UsersController } from '@api/modules/users/users.controller';
import { UsersService } from '@api/modules/users/users.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
