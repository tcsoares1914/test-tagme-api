import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { PicturesService } from '@src/pictures/pictures.service';
import { Picture } from '@src/pictures/schemas/picture.schema';
import { PictureTestMocks } from '@src/commom/tests/mocks/pictures.mock';

describe('PicturesService', () => {
  let service: PicturesService;
  let model: Model<Picture>;

  const mockModel = {
    save: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Picture.name),
          useValue: mockModel,
        },
        PicturesService,
      ],
    }).compile();

    mockModel.save.mockReset();
    mockModel.find.mockReset();
    mockModel.findById.mockReset();
    mockModel.findByIdAndUpdate.mockReset();
    mockModel.findByIdAndDelete.mockReset();

    service = module.get<PicturesService>(PicturesService);
    model = module.get<Model<Picture>>(getModelToken(Picture.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When try to list all pictures.', () => {
    it('should return a list all pictures.', async () => {
      const query = { page: '1', keyword: 'test' };
      const pictures = PictureTestMocks.getPictures();
      jest.spyOn(model, 'find').mockImplementation(
        () =>
          ({
            limit: () => ({
              skip: jest.fn().mockResolvedValue([pictures]),
            }),
          }) as any,
      );

      const result = await service.findAll(query);

      expect(model.find).toHaveBeenCalledWith({
        title: { $regex: 'test', $options: 'i' },
      });

      expect(result).toEqual([pictures]);
    });
  });

  describe('When try to list one picture.', () => {
    it('should list one picture.', async () => {
      const picture = PictureTestMocks.getValidPictureDto();
      mockModel.findById.mockReturnValue(picture);
      const id = '00000000-0000-0000-0000-000000000000';
      const findAction = await service.findOne(id);

      expect(findAction).toMatchObject(picture);
      expect(mockModel.findById).toHaveBeenCalledTimes(1);
    });
    it('should throw an exception when list one picture.', async () => {
      mockModel.findById.mockReturnValue(null);
      const id = '00000000-0000-0000-0000-000000000000';

      await service.findOne(id).catch((ex) => {
        expect(ex).toBeInstanceOf(NotFoundException);
        expect(ex).toMatchObject({
          message: 'Picture not found!',
        });
      });
    });
  });

  describe('When try to update picture data.', () => {
    it('should update a one picture data.', async () => {
      const picture = PictureTestMocks.getPictures();
      const id = '00000000-0000-0000-0000-000000000000';
      const updatePicture = {
        title: 'Updated title',
      };
      mockModel.findByIdAndUpdate.mockReturnValue({
        ...picture[0],
        ...updatePicture,
      });

      const updateAction = await service.update(id, updatePicture);

      expect(updateAction).toMatchObject(updatePicture);
      expect(mockModel.findByIdAndUpdate).toBeCalledTimes(1);
    });
    it('should throw an NotFoundException when update one picture.', async () => {
      const id = '00000000-0000-0000-0000-000000000000';
      const updatePicture = {
        title: 'Updated title',
      };
      jest
        .spyOn(service, 'update')
        .mockRejectedValue(new NotFoundException('Picture not found!'));

      await service.update(id, updatePicture).catch((ex) => {
        expect(ex).toBeInstanceOf(NotFoundException);
        expect(ex).toMatchObject({
          message: 'Picture not found!',
        });
      });
    });
  });

  describe('When try to delete picture.', () => {
    it('should delete one picture.', async () => {
      const picture = PictureTestMocks.getValidPictureDto();
      mockModel.findById.mockReturnValue(picture);
      mockModel.findByIdAndDelete.mockReturnValue(picture);
      const id = '00000000-0000-0000-0000-000000000000';
      const deleteAction = await service.remove(id);

      expect(deleteAction).toMatchObject(picture);
      expect(mockModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });
    it('should throw an exception when delete one picture.', async () => {
      const picture = PictureTestMocks.getValidPictureDto();
      mockModel.findById.mockReturnValue(picture);
      mockModel.findByIdAndDelete.mockReturnValue(null);
      const id = '00000000-0000-0000-0000-000000000000';

      await service.remove(id).catch((ex) => {
        expect(ex).toBeInstanceOf(NotFoundException);
        expect(ex).toMatchObject({
          message: 'Picture not found!',
        });
      });
    });
  });
});
