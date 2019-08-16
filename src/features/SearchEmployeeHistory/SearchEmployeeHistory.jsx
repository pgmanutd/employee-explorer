import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import routePaths from 'shared/settings/routePaths';

import { EMPLOYEE_SEARCH_HISTORY_LOCAL_STORAGE_DETAILS } from 'shared/appConstants';

import useLocalStorage from 'shared/hooks/useLocalStorage';

const SearchEmployeeHistory = props => {
  const [employeeSearchHistory, , clearEmployeeSearchHistory] = useLocalStorage(
    EMPLOYEE_SEARCH_HISTORY_LOCAL_STORAGE_DETAILS.key,
    EMPLOYEE_SEARCH_HISTORY_LOCAL_STORAGE_DETAILS.value,
  );

  return (
    <section
      data-testid="SearchEmployeeHistory"
      className="jumbotron"
      {...props}
    >
      History of search{' '}
      {employeeSearchHistory.length > 0 && (
        <>
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={clearEmployeeSearchHistory}
          >
            Clear
          </button>
          <ul>
            {employeeSearchHistory.map(employeeName => (
              <li key={employeeName}>
                <Link
                  to={`${routePaths.employeeOverview.base}/${employeeName}`}
                >
                  {employeeName}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default memo(SearchEmployeeHistory);
