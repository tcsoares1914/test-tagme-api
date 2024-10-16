import { Test, TestingModule } from '@nestjs/testing';
import { PicturesService } from '@src/pictures/pictures.service';
import { PicturesController } from '@src/pictures/pictures.controller';

describe('PicturesController', () => {
  let controller: PicturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PicturesController],
      providers: [PicturesService],
    }).compile();

    controller = module.get<PicturesController>(PicturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
