import http from 'http';
import app from './src/app.js';

import { config } from 'dotenv';
config();
import connectDB from './src/config/db.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);


server.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});


