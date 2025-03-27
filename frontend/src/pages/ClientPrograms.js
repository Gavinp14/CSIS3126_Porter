import React from 'react'
import ClientNavbar from '../components/navbars/clientnav/ClientNavbar'
import ClientProgramTable from '../components/ClientProgramTable/ClientProgramTable'
function ClientPrograms() {
  return (
    <>
      <ClientNavbar/>
      <div className='container pt-5'>
        <ClientProgramTable/>
      </div>
    </>
  )
}

export default ClientPrograms
