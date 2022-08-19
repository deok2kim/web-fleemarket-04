import { IsNumber } from 'class-validator';

export class AddUserRegionDto {
  @IsNumber()
  regionId: number;
}
