import React, { useState } from 'react'
import "./clienttable.css"
import ClientCard from '../ClientCard/ClientCard'   

function ClientTable() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div>
      <div className="search-container mb-1 pt-5">
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search clients by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className='container d-flex justify-content-center flex-wrap client-table'>
        <ClientCard/>
        <ClientCard/>
        <ClientCard/>
        <ClientCard/>
      </div>
    </div>
  )
}

export default ClientTable
