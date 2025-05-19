import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from '../persistence/typeorm/user.entity';
import { TypeOrmUserRepository } from '../persistence/typeorm/user.repository';
import { USER_REPOSITORY } from '../../../core/auth/repositories/user.repository';
import { AuthService } from '../../../core/auth/services/auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [AuthController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: TypeOrmUserRepository,
    },
    AuthService,
  ],
  exports: [AuthService],
})
export class AuthModule {}