import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePictureDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  photo: string;
}
