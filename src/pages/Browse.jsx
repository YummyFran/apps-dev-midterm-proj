import React, { useState } from 'react'
import Nav from '../components/Nav'
import { fetchProducts } from '../lib/productsService'
import { useQuery } from '@tanstack/react-query'
import ProductCard from '../components/ProductCard'

const Browse = () => {
    const [filters, setFilters] = useState({})

    const { data: products } = useQuery({
        queryKey: ['products'],
        queryFn: async () => await fetchProducts({})
    })
    console.log(products)
  return (
    <div>
        <Nav />
        <section className='px-[2rem] lg:px-[10rem] flex gap-2 pb-10'>
            <aside className='w-75'>Side</aside>
            <main className='flex-1 flex flex-wrap gap-3'>
                {
                    products?.products.map(product => (
                        <ProductCard product={product} key={product.id}/>
                    ))
                }
            </main>
        </section>
    </div>
  )
}

export default Browse