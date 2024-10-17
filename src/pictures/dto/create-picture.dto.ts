import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePictureDto {
  @IsNotEmpty({
    message: 'O título não pode ser vazio.',
  })
  @IsString({
    message: 'O título deve ser do tipo string.',
  })
  @Length(2, 16, {
    message: 'O título deve ter entre 2 e 16 caracteres .',
  })
  title: string;

  @IsNotEmpty({
    message: 'A descrição não pode ser vazia.',
  })
  @IsString()
  @Length(2, 280, {
    message: 'A descrição deve ter entre 2 e 280 caracteres .',
  })
  description: string;

  @IsNotEmpty({
    message: 'O endereço da foto não pode ser vazio.',
  })
  @IsString()
  photo: string;
}
