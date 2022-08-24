import { IsNumber, IsString } from 'class-validator';

export class CreateChatRoomDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  sellerId: number;

  @IsNumber()
  buyerId: number;

  @IsString()
  id: string;
}
