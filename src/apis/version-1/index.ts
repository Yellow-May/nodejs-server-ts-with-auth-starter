import { Router } from 'express';
import AuthRouter from './routes/auth';
const VersionOneRouter = Router();

VersionOneRouter.use('/auth', AuthRouter);

export default VersionOneRouter;
