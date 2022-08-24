import { IsBoolean, IsNumber, IsString } from 'class-validator';
export class CreateMessageDto {
  @IsNumber()
  senderId: number;

  @IsString()
  content: string;

  @IsString()
  chatRoomId: string;

  @IsBoolean()
  isRead: boolean;
}
