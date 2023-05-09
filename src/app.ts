import 'reflect-metadata';
import 'express-async-errors';
import express, { Application } from 'express';
import { handleError } from './middlewares';

const app: Application = express();
app.use(express.json());

app.use(handleError);

export default app;
