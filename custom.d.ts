import { UploadedFile } from 'express-fileupload';
import { UserData } from './interfaces';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: number | string;
      DOMAIN: string;
      MONGO_CONNECTION: string;
      CLOUDINARY_URL: string;
      GOOGLE_ID: string;
      GOOGLE_SECRET: string;
      JWT_PRIVATE_KEY: Secret;
    }
  }
  declare namespace Express {
    interface Request {
      uid?: string;
      files?: {
        file: UploadedFile
      };

      user?: UserData;
    }
  }
}