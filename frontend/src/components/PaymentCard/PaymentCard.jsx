import React from 'react';
import './paymentcard.css';

const PaymentCard = () => {
  return (
    <div className="payment-card">
      <div className="payment-card__client-info">
        <img 
          src={"/IMG_1204.jpg"} 
          alt={`$profile`} 
          className="payment-card__profile-pic"
        />
        <h3 className="payment-card__client-name">John Jones</h3>
      </div>
      <div className="payment-card__due-date">
        <p>Payment Due: 1/28/25</p>
      </div>
    </div>
  );
};

export default PaymentCard;
