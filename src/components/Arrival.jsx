import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getRandomProducts } from '../lib/productsService'
import ProductCard from './ProductCard'

const Arrival = () => {

    const { data: arrivals } = useQuery({
        queryKey: ['arrivals'],
        queryFn: async () => await getRandomProducts()
    })
    console.log(arrivals)
  return (
    <div className='px-[2rem] lg:px-[10rem] py-2'>
        <h2 className='font-bold text-2xl pb-4'>New Arrivals</h2>
        <div className='flex gap-4'>
            {
                arrivals?.products ? 
                    arrivals?.products.map(product => (
                        <ProductCard product={product} key={product.id} className={'flex-1'}/>
                    ))
                :
                    Array(4).fill('').map((_, i)=> (
                        <ProductCard key={i} />
                    ))
            }
        </div>
    </div>
  )
}

export default Arrival