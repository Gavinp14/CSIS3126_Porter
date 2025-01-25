import React from 'react'
import ClientNavbar from '../components/navbars/clientnav/ClientNavbar'
import ProgramTable from '../components/ProgramTable/ProgramTable'

function ClientPrograms() {
  return (
    <>
      <ClientNavbar/>
      <div className='container pt-5'>
        <ProgramTable/>
      </div>
    </>
  )
}

export default ClientPrograms
