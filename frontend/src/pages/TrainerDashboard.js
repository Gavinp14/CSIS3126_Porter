import React from 'react'
import TrainerNavbar from '../components/navbars/trainernav/TrainerNavbar'
import PaymentChart from '../components/PaymentChart/PaymentChart'
import PaymentCardTable from '../components/PaymentCardTable/PaymentCardTable'

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
                <PaymentCardTable/>
            </div>
          </div>
        </div>
    </>
  )
}

export default TrainerDashboard
