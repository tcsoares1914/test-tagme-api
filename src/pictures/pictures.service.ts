import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Query as QueryParams } from 'express-serve-static-core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePictureDto } from '@src/pictures/dto/create-picture.dto';
import { UpdatePictureDto } from '@src/pictures/dto/update-picture.dto';
import { Picture } from '@src/pictures/schemas/picture.schema';

@Injectable()
export class PicturesService {
  /**
   * Inject repository dependency.
   */
  constructor(
    @InjectModel(Picture.name) private pictureModel: Model<Picture>,
  ) {}

  /**
   * Create new collection item.
   */
  async create(createPictureDto: CreatePictureDto): Promise<Picture> {
    const picture = new this.pictureModel(createPictureDto);
    const newPicture = await picture.save();

    if (!newPicture) {
      throw new InternalServerErrorException(
        'Problem to create a picture. Try again!',
      );
    }

    return newPicture;
  }

  /**
   * List all collection items.
   */
  async findAll(query?: QueryParams): Promise<Picture[]> {
    const limit = Number(query.limit) || 10;
    const currentPage = Number(query.page) || 1;
    const skip = limit * (currentPage - 1);
    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const pictures = await this.pictureModel
      .find({ ...keyword })
      .limit(limit)
      .skip(skip);

    return pictures;
  }

  /**
   * List one collection item.
   */
  async findOne(id: string): Promise<Picture> {
    const picture = await this.pictureModel.findById(id);

    if (!picture) {
      throw new NotFoundException('Picture not found!');
    }

    return picture;
  }

  /**
   * Update one collection item.
   */
  async update(
    id: string,
    updatePictureDto: UpdatePictureDto,
  ): Promise<Picture> {
    const picture = await this.pictureModel.findByIdAndUpdate(
      id,
      updatePictureDto,
    );

    return picture;
  }

  /**
   * Delete one collection item.
   */
  async remove(id: string): Promise<Picture> {
    const picture = this.pictureModel.findByIdAndDelete(id);

    if (!picture) {
      throw new NotFoundException('Picture not found!');
    }

    return picture;
  }
}
