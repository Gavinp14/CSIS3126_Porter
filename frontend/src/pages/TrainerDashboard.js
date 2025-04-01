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
              <button className="btn btn-primary w-100 mb-3" onClick={() => setIsOpen(true)}>Edit Trainer Profile</button>
              <TrainerProfile isOpen={isOpen} onClose={() => setIsOpen(false)}/>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 'calc(100vh - 200px)', // Adjust for navbar and button height
                width: '100%',
                padding: '20px',
                overflow: 'hidden' // Prevent scrolling
              }}>
                <img 
                  src='/Trainer Pro.Prelim-02.png' 
                  alt="Logo" 
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    opacity: '0.8'
                  }}
                />
              </div>
          </div>
        </div>
    </>
  )
}

export default TrainerDashboard
