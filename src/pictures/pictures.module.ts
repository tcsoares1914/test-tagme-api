import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PicturesService } from '@src/pictures/pictures.service';
import { PicturesController } from '@src/pictures/pictures.controller';
import { Picture, PictureSchema } from '@src/pictures/schemas/picture.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Picture.name, schema: PictureSchema }]),
  ],
  controllers: [PicturesController],
  providers: [PicturesService],
})
export class PicturesModule {}
