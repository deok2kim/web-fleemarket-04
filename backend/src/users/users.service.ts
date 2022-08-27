import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from 'src/users/entities/user.entity';
import { OAuthProviderEnum } from 'src/common/enum/oauth-provider.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRegion } from 'src/entities/user-region.entity';
import { ErrorException } from 'src/common/exception/error.exception';
import { ERROR_CODE, ERROR_MESSAGE } from 'src/common/constant/error-message';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(UserRegion)
    private userRegionRepository: Repository<UserRegion>,
  ) {}

  async findUserById(id: number) {
    return this.userRepository.findOne({
      relations: ['userRegions'],
      where: {
        id,
      },
    });
  }

  async findUserInfoById(id: number) {
    const userInfo: any = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.nickname',
        'regions.id',
        'regions.isPrimary',
        'regionNames',
        'user.id',
      ])
      .leftJoin('user.userRegions', 'regions')
      .leftJoin('regions.region', 'regionNames')
      .where('user.id = :userId', { userId: id })
      .getOne();
    const newRegions = userInfo.userRegions.map((userRegion) => ({
      ...userRegion.region,
      isPrimary: userRegion.isPrimary,
    }));

    const result = {
      nickname: userInfo.nickname,
      id,
      regions: newRegions,
    };

    return result;
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

  async addUserRegion(userId: number, regionId: number) {
    const exRegionData = await this.userRegionRepository.find({
      where: {
        userId,
      },
    });
    if (exRegionData.length >= 2) {
      throw new ErrorException(
        ERROR_MESSAGE.EXCEED_REGIONS,
        ERROR_CODE.EXCEED_REGIONS,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (exRegionData.find((a) => a.regionId === regionId)) {
      throw new ErrorException(
        ERROR_MESSAGE.DUPLICATE_REGION,
        ERROR_CODE.DUPLICATE_REGION,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!exRegionData.length) {
      return this.userRegionRepository.save({
        userId,
        regionId,
        isPrimary: true,
      });
    }

    return this.userRegionRepository.save({
      userId,
      regionId,
      isPrimary: false,
    });
  }

  async removeUserRegion(userId: number, regionId: number) {
    const exRegionData = await this.userRegionRepository.find({
      where: {
        userId,
      },
    });

    if (!exRegionData.length) {
      throw new ErrorException(
        ERROR_MESSAGE.NOT_FOUND_REGION,
        ERROR_CODE.NOT_FOUND_REGION,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (exRegionData.length === 1) {
      throw new ErrorException(
        ERROR_MESSAGE.CANNOT_REMOVE_ONE_REGION,
        ERROR_CODE.CANNOT_REMOVE_ONE_REGION,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (exRegionData.find((a) => a.regionId === regionId)) {
      await this.userRegionRepository.delete({
        userId,
        regionId,
      });
      await this.userRegionRepository
        .createQueryBuilder('userRegion')
        .update(UserRegion)
        .set({
          isPrimary: true,
        })
        .where('userId = :userId', { userId })
        .execute();

      return;
    }

    throw new ErrorException(
      ERROR_MESSAGE.NOT_APPLIED_REGION,
      ERROR_CODE.NOT_APPLIED_REGION,
      HttpStatus.BAD_REQUEST,
    );
  }
}
