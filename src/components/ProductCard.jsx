import React from 'react'

const ProductCard = ({ product, className }) => {

  return (
    <div className={`shadow-lg rounded-lg basis-50 ${className}`}>
        <div className='bg-gray-200 rounded-lg aspect-[7/9]'>
            <img src={product?.thumbnail} alt={product?.name} className='h-full w-full object-cover'/>
        </div>
        <div className='py-4 flex flex-col gap-2 px-4'>
            <p className='text-md font-normal'>{product?.title}</p>
            <div className='flex justify-between items-center'>
                {
                    product ? 
                        <>
                            <p className='text-xl font-bold'>${product?.price}</p>
                            <p className={`text-xs ${product?.stock > 0 ? '' : 'text-red-500'}`}>{product?.stock} items left</p>
                        </>
                    : 
                        <>
                            <p className='bg-gray-200 w-30 h-5'></p>
                            <p className='bg-gray-200 w-20 h-5'></p>
                        </>
                }
            </div>
            <div className='flex justify-between items-center'>
                <p className='text-sm'>{product?.shippingInformation}</p>
                <p className={`text-sm ${product?.stock > 0 ? '' : 'text-red-500'}`}>{product?.availabilityStatus}</p>
            </div>
        </div>
    </div>
  )
}

export default ProductCard