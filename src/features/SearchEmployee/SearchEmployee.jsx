import React, { memo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

import routePaths from 'shared/settings/routePaths';

import { EMPLOYEE_SEARCH_HISTORY_LOCAL_STORAGE_DETAILS } from 'shared/appConstants';

import useLocalStorage from 'shared/hooks/useLocalStorage';

const SearchEmployee = props => {
  const [employeeName, setEmployeeName] = useState('');

  const [employeeSearchHistory, setEmployeeSearchHistory] = useLocalStorage(
    EMPLOYEE_SEARCH_HISTORY_LOCAL_STORAGE_DETAILS.key,
    EMPLOYEE_SEARCH_HISTORY_LOCAL_STORAGE_DETAILS.value,
  );

  const handleEmployeeNameChange = useCallback(event => {
    setEmployeeName(event.target.value);
  }, []);

  const handleSearch = useCallback(
    event => {
      if (!employeeName.trim()) {
        return event.preventDefault();
      }

      const uniqueEmployeeNames = Array.from(
        new Set([...employeeSearchHistory, employeeName]),
      );

      setEmployeeSearchHistory(uniqueEmployeeNames);
    },
    [employeeName, employeeSearchHistory, setEmployeeSearchHistory],
  );

  return (
    <section
      data-testid="SearchEmployee"
      className="input-group mt-5"
      {...props}
    >
      <input
        type="text"
        className="form-control"
        placeholder="Employee Name"
        aria-label="Employee Name"
        autoFocus
        value={employeeName}
        onChange={handleEmployeeNameChange}
      />
      <section className="input-group-append">
        <Link
          className="btn btn-outline-secondary"
          role="button"
          onClick={handleSearch}
          to={`${routePaths.employeeOverview.base}/${employeeName}`}
        >
          Search
        </Link>
      </section>
    </section>
  );
};

export default memo(SearchEmployee);
