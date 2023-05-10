import 'express-async-errors';
import 'reflect-metadata';
import express, { Application } from 'express';
import { handleError } from './middlewares';
import * as Router from './routers';

const app: Application = express();
app.use(express.json());

app.use('/users', Router.usersRouter);
app.use('/login', Router.loginRouter);
app.use('/categories', Router.categoriesRouter);
app.use('/realEstate', Router.realEstateRouter);
app.use('/schedules', Router.schedulesRouter);

app.use(handleError);

export default app;
