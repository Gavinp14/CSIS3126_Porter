import React from 'react'
import TrainerNavbar from '../components/navbars/trainernav/TrainerNavbar'
import MessageTable from '../components/MessageTable/MessageTable'
import MessageForm from '../components/MessageForm/MessageForm'

function TrainerMessages() {
  return (
    <>
      <TrainerNavbar/>
      <div className="row">
        <div className="col-sm-4">
          <MessageTable />
        </div>
        <div className="col-sm-8">
          <MessageForm />
        </div>
      </div>
    </>
  )
}

export default TrainerMessages