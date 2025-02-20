import React, {useState} from 'react'
import TrainerNavbar from '../components/navbars/trainernav/TrainerNavbar'
import PaymentChart from '../components/PaymentChart/PaymentChart'
import PaymentCardTable from '../components/PaymentCardTable/PaymentCardTable'
import TrainerProfile from '../components/TrainerProfile/TrainerProfile'

function TrainerDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
        <TrainerNavbar/>
        <div className="container">
          <div className="row pt-5">
            <div className="col-sm-6">
                <PaymentChart/>
            </div>
            <div className="col-sm-6">
                <button className="btn btn-primary w-100 mb-3" onClick={() => setIsOpen(true)}>Edit Trainer Profile</button>
                <TrainerProfile isOpen={isOpen} onClose={() => setIsOpen(false)}/>
                <PaymentCardTable/>
            </div>
          </div>
        </div>
    </>
  )
}

export default TrainerDashboard
