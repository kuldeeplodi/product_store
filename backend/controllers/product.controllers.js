import { sql } from '../config.js/db.js';

export const getAllProduct=async(req,res)=>{
            try {
                const products=await sql`SELECT * FROM products ORDER BY id DESC`;
                res.status(200).json({success:true,data:products})
                console.log("fatched products:",products)
            } catch (error) {
                console.log("Error fetching products:",error);
                res.status(500).json({message:"Internal server error"});
            }
}

export const createProduct=async(req,res)=>{
  const {name,image,price}=req.body;
  if(!name || !price || !image){
    return res.status(400).json({success:false,message:"All fields are required"});
  }
  try {
    const newProduct=await sql
    `INSERT INTO products(name,image,price) VALUES(${name},${image},${price}) RETURNING *`;
    console.log("Product created:",newProduct);
    res.status(201).json({success:true,data:newProduct});

  } catch (error) {
    console.log("Error creating product:",error);
    res.status(500).json({success:false,message:"Internal server error"});
    
  }
}

export const getProduct=async(req,res)=>{
const {id}=req.params;
try {
    const product=await sql`SELECT * FROM products WHERE id=${id}`;
    if(product.length===0){
        return res.status(404).json({success:false,message:"Product not found"});
    }
    console.log("fetched product:",product);
    res.status(200).json({success:true,data:product[0]});
    
} catch (error) {
    console.log("Error fetching product:",error);
    res.status(500).json({success:false,message:"Internal server error"});
}
}
export const deleteProduct=async(req,res)=>{
                  const {id}=req.params;
                  try {
                    const deleteProuduct=await sql`DELETE FROM products WHERE id=${id} ReTURNING *`;
                    
                    if(deleteProuduct.length===0){
                        return res.status(404).json({success:false,message:"Product not found"});
                    }

                
                    res.status(200).json({success:true,data:deleteProuduct[0]});
                    
                  } catch (error) {
                    console.log("Error deleting product:",error);
                    res.status(500).json({success:false,message:"Internal server error"});
                  }
}
export const updateProduct=async(req,res)=>{
    const {id}=req.params;
    const {name,image,price}=req.body;
    try {
        const updateProduct=await sql`UPDATE products SET name=${name},image=${image},price=${price} WHERE id=${id} RETURNING *`;
        if(updateProduct.length===0){
            return res.status(404).json({success:false,message:"Product not found"});
        }
        res.status(200).json({success:true,data:updateProduct[0]});
    } catch (error) {
        console.log("Error updating product:",error);
        res.status(500).json({success:false,message:"Internal server error"});
        
    }
}