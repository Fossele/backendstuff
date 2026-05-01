import express from 'express';
import  mongoose from 'mongoose';



const app = express();

app.use(express.json())


//import routes
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';


//routes declaration
app.use('/api/v1/users', userRouter);
app.use('api/v1/posts', postRouter);


export default app;

