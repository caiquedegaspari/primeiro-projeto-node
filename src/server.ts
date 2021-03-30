import express, { NextFunction, Request, Response } from 'express';
import routes from './routes/';
import 'reflect-metadata';

import './database';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use('/files',express.static(uploadConfig.directory))
app.use(routes);

app.use((err:Error,resquest:Request,response:Response,next:NextFunction)=>{
  if(err instanceof AppError)
})

app.listen(3333,()=>{
  console.log("Server started on port 3333!")
})