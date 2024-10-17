import { Picture } from '@src/pictures/schemas/picture.schema';
import { CreatePictureDto } from '@src/pictures/dto/create-picture.dto';

export class PictureTestMocks {
  static getValidPicture(): Picture {
    const picture = new Picture();
    picture.title = 'Title One';
    picture.description = 'Description for title one';
    picture.photo = 'https://domain.com/assets/picture1.png';

    return picture;
  }

  static getValidPictureDto(): CreatePictureDto {
    const picture = new CreatePictureDto();
    picture.title = 'Title One';
    picture.description = 'Description for title one';
    picture.photo = 'https://domain.com/assets/picture1.png';

    return picture;
  }

  static getPictures(): Picture[] {
    const pictures: Picture[] = [
      {
        title: 'Title One',
        description: 'Description for title one',
        photo: 'https://domain.com/assets/picture1.png',
        created: new Date(),
        updated: new Date(),
      },
      {
        title: 'Title Two',
        description: 'Description for title two',
        photo: 'https://domain.com/assets/picture2.png',
        created: new Date(),
        updated: new Date(),
      },
    ];

    return pictures;
  }

  static getNewPicture(): Picture {
    const newPicture: Picture = new Picture({
      title: 'Picture One',
      description: 'https://domain.com/assets/picture1.png',
      photo: 'https://domain.com/assets/picture1.png',
    });

    return newPicture;
  }

  static getUpdatedPicture() {
    return new Picture({
      title: 'Title updated',
    });
  }
}
