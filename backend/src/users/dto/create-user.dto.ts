import { IsString } from 'class-validator';
import { OAuthProviderEnum } from 'src/common/enum/oauth-provider.enum';

export class CreateUserDto {
  @IsString()
  snsId: string;

  @IsString()
  provider: OAuthProviderEnum;

  @IsString()
  nickname: string;
}
