import React from 'react'
import "./programtable.css"
import ProgramCard from '../ProgramCard/ProgramCard'

function ProgramTable() {
  return (
    <div className='program-table'>
        <ProgramCard/>
        <ProgramCard/>
        <ProgramCard/>
        <ProgramCard/>  
    </div>
  )
}

export default ProgramTable
