import { UserData } from './interfaces';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: number | string;
      DOMAIN: string;
      MONGO_CONNECTION: string;
      CLOUDINARY_URL: string;
      JWT_PRIVATE_KEY: Secret;
    }
  }
  declare namespace Express {
    interface Request {
      uid?: string;
      files?: {
        file: any
      };

      user?: UserData;
    }
  }
}