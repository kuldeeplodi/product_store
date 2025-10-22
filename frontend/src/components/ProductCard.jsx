import { Link } from "react-router-dom"
import { EditIcon, TrashIcon } from "lucide-react"
import { useProductStore } from "../store/useProductStore"

function ProductCard({product}) {
   
    const {deleteProduct}=useProductStore();
  return (
    <div className='card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300'>

        {/* product image */}
        <figure className='relative pt-[56.25%]'>
            <img src={product.image} alt={product.name} className='absolute top-0 left-0 w-full h-full object-cover'/>
        </figure>

        <div className='card-body'>
            <h2 className='card-title text-lg font-semibold'>
                {product.name}
            </h2>
            <p className='text-2xl font-bold text-primary'>${Number(product.price).toFixed(2)}</p>

            {/* card actions */}
            <div className='card-actions justify-end mt-4'>
                <Link to={`/product/${product.id}`} className="btn btn-info btn-sm btn-outline">
                <EditIcon className="size-4"></EditIcon>
                </Link>

                <button className="btn btn-sm btn-error btn-outline" onClick={()=>deleteProduct(product.id)}>
                    <TrashIcon className="size-4"></TrashIcon>
                </button>
            </div>
        </div>
      
    </div>
  )
}

export default ProductCard
