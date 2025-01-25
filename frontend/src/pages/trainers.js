import React from 'react';
import ClientNavbar from '../components/navbars/clientnav/ClientNavbar';
import TrainersTable from '../components/TrainersTable/TrainersTable';
import CriteriaFilter from '../components/CriteriaFilter/CriteriaFilter';

function Trainers() {
  return (
    <>
      <ClientNavbar />
      <div className="container-fluid">
        <div className="row">
          {/* Left side - Criteria Filter */}
          <div className="col-sm-4 mt-3 mb-3">
            <CriteriaFilter /> {/* Add your filter component here */}
          </div>
          {/* Right side - Trainers Table */}
          <div className="col-sm-8 mt-3 mb-3">
            <TrainersTable />
          </div>
        </div>
      </div>
    </>
  );
}

export default Trainers;
