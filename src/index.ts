import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { config } from './config/app.config';
import connectDatabase from './database/database';
import { errorHandler } from './middleware/errorHandler';
import { HTTPSTATUS } from './config/http.config';
import { asyncHandler } from './middleware/asyncHandler';
import authRoutes from './modules/auth/auth.routes';
import passport from './middleware/passport';
import { authenticateJWT } from './common/strategies/jwt.strategy';
import sessionRoutes from './modules/session/session.routes';
import mfaRoutes from './modules/mfa/mfa.routes';

const app = express();
const BASE_PATH = config.BASE_PATH;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    res.status(HTTPSTATUS.OK).json({
      message: 'Hello world',
    });
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/mfa`, mfaRoutes);

app.use(`${BASE_PATH}/session`, authenticateJWT, sessionRoutes);
app.use(errorHandler);
app.listen(config.PORT, async () => {
  console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
  await connectDatabase();
});
