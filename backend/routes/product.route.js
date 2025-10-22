import express from 'express';
import { getAllProduct,createProduct ,updateProduct,deleteProduct,getProduct} from '../controllers/product.controllers.js';


const router=express.Router();


router.get("/",getAllProduct);
router.get("/:id",getProduct);
router.post("/",createProduct)
router.put("/:id",updateProduct);
router.delete("/:id",deleteProduct);




export default router;