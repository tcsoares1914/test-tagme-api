import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreatePictureDto } from '@src/pictures/dto/create-picture.dto';

export class UpdatePictureDto extends PartialType(CreatePictureDto) {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  drscription?: string;

  @IsOptional()
  @IsString()
  photo?: string;
}
