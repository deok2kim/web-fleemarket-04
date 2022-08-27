import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { AddUserRegionDto } from './dto/add-user-region.dto';
import { ChangeUserPrimaryRegionDto } from './dto/change-user-primary-region.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  getUserInfo(@Req() req) {
    return this.usersService.findUserInfoById(req.user.id);
  }

  @Post('/region')
  @UseGuards(JwtAuthGuard)
  async addUserRegion(@Req() req, @Body() addUserRegionDto: AddUserRegionDto) {
    await this.usersService.addUserRegion(
      req.user.id,
      addUserRegionDto.regionId,
    );
    return;
  }

  @Delete('/region/:id')
  @UseGuards(JwtAuthGuard)
  async removeUserRegion(@Req() req, @Param('id') id: number) {
    return this.usersService.removeUserRegion(req.user.id, id);
  }

  @Post('/region/primary')
  @UseGuards(JwtAuthGuard)
  async changeUserPrimaryRegion(
    @Req() req,
    @Body() changeUserPrimaryRegion: ChangeUserPrimaryRegionDto,
  ) {
    await this.usersService.changeUserPrimaryRegion(
      req.user.id,
      changeUserPrimaryRegion.regionId,
    );
    return;
  }
}
