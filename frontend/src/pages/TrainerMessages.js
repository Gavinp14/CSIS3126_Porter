import React from 'react'
import TrainerNavbar from '../components/navbars/trainernav/TrainerNavbar'
import MessageTable from '../components/MessageTable/MessageTable'


function TrainerMessages() {
  return (
    <>
      <TrainerNavbar/>
      <div>
          <MessageTable />
      </div>
    </>
  )
}

export default TrainerMessages