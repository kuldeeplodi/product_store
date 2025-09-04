import express from 'express';
import { getAllProduct,createProduct } from '../controllers/product.controllers.js';


const router=express.Router();


router.get("/",getAllProduct);
router.post("/",createProduct)




export default router;