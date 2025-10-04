import React, { useState } from 'react'
import Nav from '../components/Nav'
import Stepper from '../components/Stepper'
import CartItems from '../components/CartItems'
import CheckoutDetails from '../components/CheckoutDetails'

const Cart = () => {
    const [step, setStep] = useState(1)

  return (
    <div className='min-h-screen flex flex-col'>
        <Nav />
        <Stepper step={step} />
        
        <main className='grid grid-cols-[6fr_3fr] gap-6 flex-1 mx-[10rem] pb-[5rem]'>
            <div className=''>
              <CartItems />
            </div>
            <div className=''>
              <CheckoutDetails />
            </div>
        </main>
    </div>
  )
}

export default Cart