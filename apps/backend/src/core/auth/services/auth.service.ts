import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../../core/auth/entities/user.entity';
import { USER_REPOSITORY, UserRepository } from '../../../core/auth/repositories/user.repository';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) 
    private readonly userRepository: UserRepository,
  ) {}

  async register(email: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const newUser = User.create(email);
    await this.userRepository.save(newUser);
    
    return newUser;
  }
}