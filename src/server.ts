import 'express-async-errors';
import express, { type Application } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import corsOptions from './configs/cors';
import NotFoundHandler from './middlewares/404';
import ErrorsHandler from './middlewares/ErrorsHandler';
import VersionOneRouter from './apis/version-1';

// initialize app
const app: Application = express();

// app middlewares
app.use(express.json());
app.use(helmet({ contentSecurityPolicy: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

// api routes
app.use('/api/v1', VersionOneRouter);

// routes middlewares
app.use(NotFoundHandler);
app.use(ErrorsHandler);

// create server
const server = http.createServer(app);

export default server;
