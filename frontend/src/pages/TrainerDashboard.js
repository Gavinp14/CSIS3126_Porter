import React from 'react'
import TrainerNavbar from '../components/navbars/trainernav/TrainerNavbar'
import PaymentChart from '../components/PaymentChart/PaymentChart'

function TrainerDashboard() {
  return (
    <>
        <TrainerNavbar/>
        <div className="container">
          <div className="row pt-5">
            <div className="col-sm-6">
                <PaymentChart/>
            </div>
            <div className="col-sm-6">
                
            </div>
          </div>
        </div>
    </>
  )
}

export default TrainerDashboard
