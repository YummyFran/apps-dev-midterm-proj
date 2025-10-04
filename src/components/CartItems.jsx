import React, { useState } from 'react'
import { useCart } from '../providers/CartContext'
import CartItem from './CartItem'

const CartItems = () => {
    const [selected, setSelected] = useState([])
    const { cart } = useCart()
  return (
    <div>
        <div>
            <div className='flex py-2 gap-2 items-center '>
                <input type="checkbox" id='select-all' />
                <label htmlFor="select-all">{selected.length}/{cart?.length} items selected</label>
            </div>
            
            <div className='flex flex-col px-4 border border-gray-300 rounded-lg'>
                {
                    cart?.map(item => (
                        <CartItem item={item} key={item.id}/>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default CartItems