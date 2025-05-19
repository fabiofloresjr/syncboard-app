import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserRepository } from '../../../../core/auth/repositories/user.repository';
import { User } from '../../../../core/auth/entities/user.entity';
import { UserOrmEntity } from './user.entity';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  private repository: Repository<UserOrmEntity>;

  constructor(private dataSource: DataSource) {
    this.repository = dataSource.getRepository(UserOrmEntity);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { email } });
    return user ? new User(user.id, user.email, user.createdAt) : null;
  }

  async save(user: User): Promise<void> {
    await this.repository.save({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt
    });
  }
}