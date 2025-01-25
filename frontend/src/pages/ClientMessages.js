import React from 'react'
import ClientNavbar from '../components/navbars/clientnav/ClientNavbar'
import MessageTable from '../components/MessageTable/MessageTable'
import MessageForm from '../components/MessageForm/MessageForm'

function ClientMessages() {
  return (
    <>
      <ClientNavbar/>
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

export default ClientMessages
