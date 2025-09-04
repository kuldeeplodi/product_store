import express from 'express';
import dotenv from 'dotenv';
import helmet from "helmet";
import morgan from 'morgan';
import cors from 'cors';
import productRouters from './routes/product.route.js';

dotenv.config();
const PORT=process.env.PORT || 5000;


const app=express();
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/products",productRouters);
app.listen(PORT,()=>{
    console.log("Server is running on port "+PORT);
});