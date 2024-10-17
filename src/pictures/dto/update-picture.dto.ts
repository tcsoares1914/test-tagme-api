import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, Length } from 'class-validator';
import { CreatePictureDto } from '@src/pictures/dto/create-picture.dto';

export class UpdatePictureDto extends PartialType(CreatePictureDto) {
  @IsOptional()
  @IsString()
  readonly id?: string;

  @IsOptional()
  @IsString({
    message: 'O título deve ser do tipo string.',
  })
  @Length(2, 16, {
    message: 'O título deve ter entre 2 e 16 caracteres .',
  })
  title?: string;

  @IsOptional()
  @IsString({
    message: 'O título deve ser do tipo string.',
  })
  @Length(2, 280, {
    message: 'A descrição deve ter entre 2 e 280 caracteres .',
  })
  drscription?: string;

  @IsOptional()
  @IsString({
    message: 'O título deve ser do tipo string.',
  })
  photo?: string;
}
