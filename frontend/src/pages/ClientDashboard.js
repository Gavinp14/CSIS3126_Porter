import React, {useState} from 'react'
import ClientNavbar from '../components/navbars/clientnav/ClientNavbar'
import ProgressChart from '../components/ProgressChart/ProgressChart'
import TrainerInfo from '../components/TrainerInfo/TrainerInfo'
import ClientProfile from '../components/ClientProfile/ClientProfile'

function ClientDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ClientNavbar />
      <div className="container pt-5">
        <div className="row">
            <button className="btn btn-primary w-100 mb-3" onClick={() => setIsOpen(true)}>Edit Client Profile</button>
            <ClientProfile isOpen={isOpen} onClose={() => setIsOpen(false)}/>
            <ProgressChart />
        </div>
      </div>
    </>
  )
}

export default ClientDashboard
