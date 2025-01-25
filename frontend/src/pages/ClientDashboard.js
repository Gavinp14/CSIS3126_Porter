import React from 'react'
import ClientNavbar from '../components/navbars/clientnav/ClientNavbar'
import ProgressChart from '../components/ProgressChart/ProgressChart'
import TrainerInfo from '../components/TrainerInfo/TrainerInfo'

function ClientDashboard() {
  return (
    <>
      <ClientNavbar />
      <div className="container pt-5">
        <div className="row">
          <div className="col-sm-6">
            <ProgressChart />
          </div>
          <div className="col-sm-6">
            <TrainerInfo />
          </div>
        </div>
      </div>
    </>
  )
}

export default ClientDashboard
