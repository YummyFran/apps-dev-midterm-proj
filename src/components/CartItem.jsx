import React, { useEffect, useState } from 'react'
import { useCart } from '../providers/CartContext'

const CartItem = ({ item }) => {
    const [quantity, setQuantity] = useState(item.quantity)
    const { addToCart, removeFromCart } = useCart()
    console.log(item)

    useEffect(() => {
        addToCart(prev => {
            return prev.map((cartItem) =>
                cartItem.id === item.id
                    ? {
                        ...cartItem,
                        quantity: quantity,
                        subtotal: quantity * cartItem.price,
                    }
                    : cartItem
            )
        })
    }, [quantity])
  return (
    <div className='flex gap-4 py-4 border-b border-gray-300 relative'>
        <div className='absolute top-2 right-0 cursor-pointer text-lg text-gray-400' onClick={() => removeFromCart(item.id)}>&times;</div>
        <div className='h-30 w-40 bg-gray-200 py-2 rounded-md'>
            <img src={item.thumbnail} alt={item.title} className='w-full h-full object-contain'/>
        </div>
        <div className='flex flex-col flex-1'>
            <h3 className='font-bold text-md'>{item.title}</h3>
            <p className='flex gap-1 items-center text-sm text-gray-500'>
                {item.brand && (<><span>{item.brand}</span> <span>&#183;</span></>)}
                <span>{item.shippingInformation}</span>
            </p>
            <div className='flex justify-between items-end mt-auto'>
                <p className='font-bold text-xl'>${(item.subtotal).toFixed(2)}</p>
                <div className="flex">
                <button
                  className="border border-gray-500 px-3 h-8 flex justify-center items-center rounded-l-md cursor-pointer"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  value={item?.stock <= 0 ? 0 : quantity}
                  onChange={(e) =>
                    setQuantity(e.target.value && Math.max(1, e.target.value))
                  }
                  className="border-y border-gray-500 field-sizing-content px-4 appearance-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                />
                <button
                  className="border border-gray-500 px-3 h-8 flex justify-center items-center rounded-r-md cursor-pointer"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default CartItem