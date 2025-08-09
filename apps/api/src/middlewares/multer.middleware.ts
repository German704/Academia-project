import { InvalidDataError } from 'app-domain';
import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new InvalidDataError({file: "Invalid file type"}));
    }
  }
});

export const uploadSingleFileMiddleware = (fieldName: string) => upload.single(fieldName);