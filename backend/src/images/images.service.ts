import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
  async uploadImage(files: Express.MulterS3.File[]) {
    const urls = files.reduce(
      (locations, file) => [...locations, file.location],
      [],
    );
    return { urls };
  }
}
