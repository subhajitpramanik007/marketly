import { ApiResponse, asyncHandler, BadRequestError } from '@marketly/http';
import { env } from '@marketly/config';
import { deleteImagesFromCloudinary, uploadImageToCloudinary } from './upload.service';

const MAX_FILE_SIZE = 5;
const ALLOWED_MIME_TYPES = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

export const uploadSingleImage = asyncHandler(async (req, res) => {
  const file = req.file;
  if (!file) throw new BadRequestError('Image is required');

  if (file.size > MAX_FILE_SIZE * 1024 * 1024) {
    throw new BadRequestError(`Image size should be less than ${MAX_FILE_SIZE}MB`);
  }

  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    throw new BadRequestError('Invalid image format');
  }

  const { folder, tags } = req.body;

  let folderName: string = `/${env.NODE_ENV}`;
  let tagsArray: string[] = [];

  if (folder && typeof folder === 'string') folderName = folderName + `/${folder}`;
  else folderName = folderName + `/images`;

  if (tags && typeof tags === 'string') tagsArray = tags.split(',');
  tagsArray.push('marketly');

  const { mimetype, originalname, size } = file;

  const imageData = await uploadImageToCloudinary(file, folderName, mimetype, originalname, size);

  res.status(200).json(new ApiResponse(200, { imageData }, 'Image uploaded successfully'));
});

export const multipleUpload = asyncHandler(async (req, res) => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) throw new BadRequestError('Images are required');

  const { folder, tags } = req.body;

  let folderName: string;
  let tagsArray: string[] = [];

  if (folder && typeof folder === 'string') folderName = `/${env.NODE_ENV}/${folder}`;
  else folderName = `/${env.NODE_ENV}/images`;

  if (tags && typeof tags === 'string') tagsArray = tags.split(',');
  tagsArray.push('marketly');

  for (const file of files) {
    if (file.size > MAX_FILE_SIZE * 1024 * 1024) {
      throw new BadRequestError(`Image size should be less than ${MAX_FILE_SIZE}MB`);
    }
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestError('Invalid image format');
    }
  }

  const imagesData = await Promise.all(
    files.map(file =>
      uploadImageToCloudinary(file, folderName, file.mimetype, file.originalname, file.size, tags),
    ),
  );

  res.status(200).json(new ApiResponse(200, { imagesData }, 'Images uploaded successfully'));
});

export const deleteImage = asyncHandler(async (req, res) => {
  let { publicIds } = req.body;
  if (!publicIds || publicIds.length === 0) throw new BadRequestError('Public ID is required');

  if (!Array.isArray(publicIds) && typeof publicIds !== 'string') {
    publicIds = [publicIds];
  }

  await deleteImagesFromCloudinary(publicIds);

  res.status(200).json(new ApiResponse(200, {}, 'Image deleted successfully'));
});
