import { randomBytes } from 'crypto';
import { Request } from 'express';
import multer from 'multer';
import { resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (req: Request, file, cb) => {
      const hash = randomBytes(6).toString('hex');

      const fileName = `${hash}-${file.originalname}`;

      return cb(null, fileName);
    }
  }),
}
