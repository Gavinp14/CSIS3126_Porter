import React from 'react'
import ClientNavbar from '../components/navbars/clientnav/ClientNavbar'
import MessageTable from '../components/MessageTable/MessageTable'
import MessageForm from '../components/MessageForm/MessageForm'

function ClientMessages() {
  return (
    <>
      <ClientNavbar/>
      <div>
          <MessageTable />
      </div>
    </>
  )
}

export default ClientMessages
