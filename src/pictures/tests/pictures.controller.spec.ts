import { Test, TestingModule } from '@nestjs/testing';
import { PicturesController } from '@src/pictures/pictures.controller';
import { PicturesService } from '@src/pictures/pictures.service';
import { CreatePictureDto } from '@src/pictures/dto/create-picture.dto';
import { UpdatePictureDto } from '@src/pictures/dto/update-picture.dto';
import { PictureTestMocks } from '@src/commom/tests/mocks/pictures.mock';
import { NotFoundException } from '@nestjs/common';

describe('PicturesController', () => {
  let controller: PicturesController;
  let service: PicturesService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockPictures = PictureTestMocks.getPictures();
  const mockNewPicture = PictureTestMocks.getNewPicture();
  const mockUpdatedPicture = PictureTestMocks.getUpdatedPicture();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PicturesController],
      providers: [
        {
          provide: PicturesService,
          useValue: mockService,
        },
      ],
    }).compile();

    mockService.create.mockReset();
    mockService.findAll.mockReset();
    mockService.findOne.mockReset();
    mockService.update.mockReset();
    mockService.remove.mockReset();

    controller = module.get<PicturesController>(PicturesController);
    service = module.get<PicturesService>(PicturesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('When try to create a new picture.', () => {
    it('should create a new picture.', async () => {
      const input: CreatePictureDto = {
        title: 'Title one',
        description: 'Description for title one',
        photo: 'https://domain.com/assets/picture1.png',
      };

      mockService.create.mockResolvedValue(mockNewPicture);
      const response = await controller.create(input);

      expect(response).toEqual(mockNewPicture);
      expect(mockService.create).toHaveBeenCalledTimes(1);
      expect(mockService.create).toHaveBeenCalledWith(input);
    });
  });

  describe('When try to list all pictures.', () => {
    it('should return a list all pictures.', async () => {
      mockService.findAll.mockResolvedValue(mockPictures);
      const response = await controller.findAll();

      expect(typeof response).toEqual('object');
      expect(response).toEqual(mockPictures);
      expect(mockService.findAll).toHaveBeenCalledTimes(1);
    });
    it('should thow an Error when list all pictures.', () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());
      expect(service.findAll).rejects.toThrowError();
    });
  });

  describe('When try to list one picture.', () => {
    it('should list one picture.', async () => {
      mockService.findOne.mockResolvedValue(mockPictures[0]);
      const id = '00000000-0000-0000-0000-000000000000';
      const response = await controller.findOne(id);

      expect(response).toEqual(mockPictures[0]);
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
    it('should throw an Error when list one picture.', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());
      const id = '00000000-0000-0000-0000-000000000000';
      expect(service.findOne(id)).rejects.toThrowError();
    });
  });

  describe('When try to update picture data.', () => {
    it('should update a one picture data.', async () => {
      const id = '00000000-0000-0000-0000-000000000000';
      const input: UpdatePictureDto = {
        title: 'Title updated',
      };
      mockService.update.mockResolvedValue(mockUpdatedPicture);
      const result = await controller.update(id, input);

      expect(result).toMatchObject({
        title: input.title,
      });
      expect(service.update).toBeCalledTimes(1);
      expect(service.update).toBeCalledWith(id, input);
    });
    it('should throw an Error when update one picture.', () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

      expect(service.update).rejects.toThrowError();
    });
  });

  describe('When try to delete picture.', () => {
    it('should delete one picture.', async () => {
      mockService.remove.mockResolvedValue(undefined);
      const id = '00000000-0000-0000-0000-000000000000';
      const result = await controller.remove(id);

      expect(result).toBeUndefined();
    });
    it('should throw an NotFoundException when delete one picture.', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValueOnce(new NotFoundException());

      expect(service.update).rejects.toThrowError();
    });
  });
});
