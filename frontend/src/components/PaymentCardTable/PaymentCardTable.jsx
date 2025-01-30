import React from 'react'
import PaymentCard from '../PaymentCard/PaymentCard'
import './paymentcardtable.css' 

function PaymentCardTable() {
  return (
    <div className='payment-card-table'>
      <PaymentCard />
      <PaymentCard />
      <PaymentCard />
      <PaymentCard />
      <PaymentCard />
      <PaymentCard />   
    </div>
  )
}

export default PaymentCardTable
