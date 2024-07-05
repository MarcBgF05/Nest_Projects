import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import { storage } from './cloudinary/cloudinary.storage';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage: storage }))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    const result = await this.imagesService.uploadFile(file.path);
    return {
      id: result.public_id,
      url: result.secure_url,
    };
  }

  @Get()
  async listImages() {
    const images = await this.imagesService.listImages();
    return { images };
  }

  @Get(':publicId')
  async getImageById(@Param('publicId') publicId: string) {
    const imageUrl = await this.imagesService.findImageById(publicId);
    return { imageUrl };
  }

  @Delete(':publicId')
  async deleteImage(@Param('publicId') publicId: string) {
    await this.imagesService.delete(publicId);
    return { message: 'Image deleted' };
  }
}
