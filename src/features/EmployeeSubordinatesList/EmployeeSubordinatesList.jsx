import React, { memo } from 'react';
import PropTypes from 'prop-types';

import apiPaths from 'shared/settings/apiPaths';

import useFetch from 'shared/hooks/useFetch';

import Spinner from 'shared/components/Spinner';

import {
  isEmployeePresent,
  getSubordinates,
  getEmployeePosition,
} from './employeeSubordinatesListUtils';

const propTypes = {
  employeeName: PropTypes.string.isRequired,
  fetchedSubordinatesList: PropTypes.shape({
    current: PropTypes.shape({
      has: PropTypes.func,
      set: PropTypes.func,
    }),
  }).isRequired,
};

const EmployeeSubordinatesList = ({
  employeeName,
  fetchedSubordinatesList,
  ...restProps
}) => {
  const { isLoading, data, error } = useFetch({
    url: apiPaths.employeeDetails({ employeeName }),
  });

  if (isLoading) {
    return <Spinner className={null} />;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Failed to fetch details for {employeeName}
      </div>
    );
  }

  if (!isEmployeePresent(data)) {
    return <p className="text-danger">Employee Not Present</p>;
  }

  const directSubordinates = getSubordinates({ fetchedSubordinatesList })(data);
  const employeePosition = getEmployeePosition(data);

  return (
    <section
      data-testid="EmployeeSubordinatesList"
      className="mt-4"
      {...restProps}
    >
      <p>
        <strong>
          {employeeName} ({employeePosition}).
        </strong>{' '}
        Subordinates of this employee are:
      </p>
      {directSubordinates.length > 0 ? (
        <ul>
          {directSubordinates.map(subordinateName => (
            <li key={subordinateName}>
              <EmployeeSubordinatesList
                employeeName={subordinateName}
                fetchedSubordinatesList={fetchedSubordinatesList}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-danger">None</p>
      )}
    </section>
  );
};

EmployeeSubordinatesList.propTypes = propTypes;

export default memo(EmployeeSubordinatesList);
