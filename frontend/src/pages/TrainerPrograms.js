import React from 'react'
import TrainerNavbar from '../components/navbars/trainernav/TrainerNavbar'
import ProgramTable from '../components/ProgramTable/ProgramTable'
import ProgramCreation from '../components/ProgramCreation/ProgramCreation'

function TrainerPrograms() {
  return (
    <>
      <TrainerNavbar />
      <div className='container pt-5'>
        <div className='row'>
          <div className='col-sm-6'>
            <h2 className='px-3 mb-5'>My Programs</h2>
            <ProgramTable />  
          </div>
          <div className='col-sm-6'>
            <ProgramCreation />
          </div>
        </div>
      </div>
    </>
  )
}

export default TrainerPrograms
