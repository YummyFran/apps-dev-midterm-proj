import React, { useState } from 'react'
import Nav from '../components/Nav'
import Stepper from '../components/Stepper'
import CartItems from '../components/CartItems'

const Cart = () => {
    const [step, setStep] = useState(1)

  return (
    <div className='min-h-screen flex flex-col'>
        <Nav />
        <Stepper step={step} />
        
        <main className='grid grid-cols-[4fr_3fr] flex-1 mx-[10rem]'>
            <div className=''>
              <CartItems />
            </div>
            <div className=''>

            </div>
        </main>
    </div>
  )
}

export default Cart