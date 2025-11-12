import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

/**
 * User entity для Swagger документации API responses
 *
 * Best practice: Response DTO не требует валидации,
 * поэтому используем опциональные поля для совместимости с TypeScript strict mode
 */
export class UsersDTO implements User {
  @ApiProperty({
    type: Number,
    description: 'User ID',
    example: 1,
  })
  id: bigint;

  @ApiProperty({
    description: 'User email',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    nullable: true,
    required: false,
    description: 'User name',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'Creation date',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
