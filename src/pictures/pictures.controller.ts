import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PicturesService } from '@src/pictures/pictures.service';
import { CreatePictureDto } from '@src/pictures/dto/create-picture.dto';
import { UpdatePictureDto } from '@src/pictures/dto/update-picture.dto';
import { Picture } from '@src/pictures/schemas/picture.schema';

@Controller('pictures')
export class PicturesController {
  /**
   * Inject service dependency.
   */
  constructor(private readonly picturesService: PicturesService) {}

  /**
   * Create new collection item.
   */
  @Post()
  async create(@Body() createPictureDto: CreatePictureDto): Promise<Picture> {
    return await this.picturesService.create(createPictureDto);
  }

  /**
   * List all collection items.
   */
  @Get()
  async findAll(): Promise<Picture[]> {
    return await this.picturesService.findAll();
  }

  /**
   * List one collection item.
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Picture> {
    return await this.picturesService.findOne(id);
  }

  /**
   * Update one collection item.
   */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePictureDto: UpdatePictureDto,
  ): Promise<Picture> {
    return await this.picturesService.update(id, updatePictureDto);
  }

  /**
   * Delete one collection item.
   */
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Picture> {
    return await this.picturesService.remove(id);
  }
}
