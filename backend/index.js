import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './config/database.js'
import cors from 'cors'
import userRoute from './routes/userRoute.js'
import tweetRoute from './routes/tweetRoute.js'
import cookieParser from 'cookie-parser'
const app = express();
dotenv.config();
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static('uploads'))

app.use('/api/v1/user',userRoute);
app.use('/api/v1/tweet',tweetRoute);

app.listen(process.env.PORT,()=>{
    dbConnection();
    console.log(`Server running at port ${process.env.PORT}`)
})