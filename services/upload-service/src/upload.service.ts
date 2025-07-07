import fs from 'fs';

import { dbClient, inArray } from '@marketly/drizzle/index';
import { imageTable } from '@marketly/drizzle/db/schemas';

import { BadRequestError } from '@marketly/http';
import { cloudinary } from './cloudinary.config';
import { logger } from '@marketly/logger';

export async function uploadImageToCloudinary(
  file: Express.Multer.File,
  folderName: string,
  mimetype: string,
  originalname: string,
  size: number,
  tags?: string[],
) {
  try {
    const result = await cloudinary.uploader.upload(
      file.path,
      {
        folder: 'marketly' + folderName,
        resource_type: 'image',
        tags: tags && Array.isArray(tags) ? tags : ['marketly'],
      },
      (error, result) => {
        if (error) {
          logger.error(error, 'Cloudinary upload error');
        }
      },
    );

    if (!result) {
      throw new BadRequestError('Image upload failed');
    }

    const imageData = {
      publicId: result.public_id,
      url: result.secure_url,
      mimetype,
      originalname,
      size,
      tags,
      width: result.width,
      height: result.height,
    };

    // clean up from temp folder
    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);

    const image = await dbClient
      .insert(imageTable)
      .values({
        publicId: result.public_id,
        url: result.secure_url,
        alt: originalname,
        metadata: {
          width: result.width,
          height: result.height,
          size,
          format: mimetype,
          mimeType: mimetype,
          tags,
        },
      })
      .returning();

    return image[0];
  } catch (error) {
    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
    throw new BadRequestError('Image upload failed');
  }
}

export async function deleteImagesFromCloudinary(publicIds: string[]) {
  await Promise.all(publicIds.map(publicId => cloudinary.uploader.destroy(publicId)));

  await dbClient
    .delete(imageTable) // delete from db
    .where(inArray(imageTable.publicId, publicIds));
}
