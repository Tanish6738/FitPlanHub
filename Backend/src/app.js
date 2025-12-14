import express from 'express';
import morgan from 'morgan';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.route.js';
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', // Frontend URL
};

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
    res.send('hello world');
});
 
export default app;