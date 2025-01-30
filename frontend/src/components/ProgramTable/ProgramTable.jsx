import React, { useState } from 'react'
import "./programtable.css"
import ProgramCard from '../ProgramCard/ProgramCard'


function ProgramTable() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className='program-table d-flex flex-column'>
      <div className="search-container mb-1 pt-5">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search clients by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
        <div className='d-flex flex-wrap justify-content-center gap-3'>
        <ProgramCard/>
        <ProgramCard/>
        <ProgramCard/>
        <ProgramCard/>  
      </div>
    </div>
  )
}

export default ProgramTable
