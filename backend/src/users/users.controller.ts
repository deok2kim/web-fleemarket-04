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
  addUserRegion(@Req() req, @Body() addUserRegionDto: AddUserRegionDto) {
    return this.usersService.addUserRegion(
      req.user.id,
      addUserRegionDto.regionId,
    );
  }

  @Delete('/region/:id')
  @UseGuards(JwtAuthGuard)
  removeUserRegion(@Req() req, @Param('id') id: number) {
    return this.usersService.removeUserRegion(req.user.id, id);
  }
}
