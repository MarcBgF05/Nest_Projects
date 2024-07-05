import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary/cloudinary.response';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImagesService {
  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: configService.get<string>('cloudinaryCloudName'),
      api_key: configService.get<string>('cloudinaryApiKey'),
      api_secret: configService.get<string>('cloudinaryApiSecret'),
    });
  }

  uploadFile(file: string): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(file, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }

  //Listar imagenes de Cloudinary
  async listImages(): Promise<string[]> {
    try {
      const result = await cloudinary.api.resources();
      return result.resources.map((resource) => resource.url);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Falled to get list of images',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  //Mostrar una imagen de Cloudinary por Id
  async findImageById(publicId: string): Promise<string> {
    try {
      const result = await cloudinary.api.resource(publicId);
      return result.secure_url;
    } catch (error) {
      throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
    }
  }

  //   eliminar imagen
  async delete(publicId: string): Promise<void> {
    try {
      this.findImageById(publicId);
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      throw new HttpException(
        'Failed to delete image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
