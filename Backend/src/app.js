import express from 'express';
import morgan from 'morgan';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.route.js';
import planRouter from './routes/plan.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import trainerRouter from './routes/trainer.routes.js';
import feedRouter from './routes/feed.routes.js';
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', 
};

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/plans', planRouter);
app.use('/api/subscriptions', subscriptionRouter);
app.use('/api/trainers', trainerRouter);
app.use('/api/feed', feedRouter);

app.get('/', (req, res) => {
    res.send('hello world');
});
 
export default app;