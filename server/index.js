import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import mongoose from 'mongoose';

import sellerRoutes from './routes/seller.js'
import buyerRoutes from './routes/buyer.js'

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
dotenv.config();

const PORT = 3001 || 3002;

mongoose.connect("mongodb+srv://sumeet123:loopmaps123@loopmaps.unswt.mongodb.net/?retryWrites=true&w=majority&appName=Loopmaps")
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port : ${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });

app.use('/seller', sellerRoutes)
app.use('/buyer', buyerRoutes)