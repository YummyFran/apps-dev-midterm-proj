import React from 'react'
import { useCart } from '../providers/CartContext'

const CartItems = () => {
    const { cart } = useCart()
  return (
    <div>CartItems</div>
  )
}

export default CartItems