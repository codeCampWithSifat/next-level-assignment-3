import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import httpStatus from 'http-status';
const app: Application = express();
// const port = 3000

// use all the middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Use All The Route
app.use('/api/v1', router);

app.use(globalErrorHandler);

// not found handler
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
