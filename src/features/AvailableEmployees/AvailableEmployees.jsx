import React, { memo } from 'react';

import apiPaths from 'shared/settings/apiPaths';

import useFetch from 'shared/hooks/useFetch';

import Spinner from 'shared/components/Spinner';

const AvailableEmployees = props => {
  const { isLoading, data: employees, error } = useFetch({
    url: apiPaths.employees(),
  });

  if (isLoading) {
    return <Spinner className={null} />;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Failed to fetch employees
      </div>
    );
  }

  return (
    <section data-testid="AvailableEmployees" className="jumbotron" {...props}>
      <p>
        <strong>Available Employees:</strong>
      </p>
      {employees && employees.length > 0 ? (
        <ul>
          {employees.map(employeeName => (
            <li key={employeeName}>{employeeName}</li>
          ))}
        </ul>
      ) : (
        <p className="text-danger">No employees available</p>
      )}
    </section>
  );
};

export default memo(AvailableEmployees);
