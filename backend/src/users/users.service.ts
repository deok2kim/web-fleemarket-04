import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from 'src/users/entities/user.entity';
import { OAuthProviderEnum } from 'src/common/enum/oauth-provider.enum';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUserById(id: number) {
    return this.userRepository.findOne({
      select: ['id', 'nickname', 'regions'],
      where: {
        id,
      },
    });
  }

  async findUserByNickname(nickname: string) {
    return this.userRepository.findOne({
      where: {
        nickname,
      },
    });
  }

  async findUserBySnsIdAndProvider(
    provider: OAuthProviderEnum,
    snsId: string,
  ): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        provider,
        snsId,
      },
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }
}
