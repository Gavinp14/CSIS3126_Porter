import React, { useState } from 'react';
import ClientNavbar from '../components/navbars/clientnav/ClientNavbar';
import TrainersTable from '../components/TrainersTable/TrainersTable';
import CriteriaFilter from '../components/CriteriaFilter/CriteriaFilter';

function Trainers() {
  const [filters, setFilters] = useState(null);

  const handleApplyFilters = (filters) => {
    setFilters(filters);
  };

  return (
    <>
      <ClientNavbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4">
          <CriteriaFilter onApplyFilters={handleApplyFilters} />
          </div>
          <div className="col-sm-8">
            <div className="pt-3">
              <TrainersTable filters={filters} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Trainers;
