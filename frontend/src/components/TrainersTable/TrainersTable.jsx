import React from 'react'
import TrainerCard from '../TrainerCard/TrainerCard'
import "./trainerstable.css"

function TrainersTable() {
  return (
    <div className="trainers-table container">
      <TrainerCard />
      <TrainerCard />
      <TrainerCard />
    </div>
  )
}

export default TrainersTable
