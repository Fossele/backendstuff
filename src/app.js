import express from 'express';
import  mongoose from 'mongoose';

import userRouter from './routes/user.route.js';

app.use(express.json())

app.use('/api/v1/users', userRouter);

const app = express();

export default app;

