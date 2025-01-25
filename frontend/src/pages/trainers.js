import React from 'react';
import ClientNavbar from '../components/navbars/clientnav/ClientNavbar';
import TrainersTable from '../components/TrainersTable/TrainersTable';
import CriteriaFilter from '../components/CriteriaFilter/CriteriaFilter';

function Trainers() {
  return (
    <>
      <ClientNavbar />
      
      <div className="container-fluid">
        <div className="row g-4">
          {/* Left side - Criteria Filter */}
          <div className="col-sm-4">
            <CriteriaFilter />
          </div>

          {/* Right side - Trainers Table */}
          <div className="col-sm-8">
            <div className="pt-3">
              <TrainersTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Trainers;
