import React, { memo } from 'react';
import PropTypes from 'prop-types';

import useLazyRef from 'shared/hooks/useLazyRef';

import Title from 'shared/components/Title';

import EmployeeSubordinatesList from 'features/EmployeeSubordinatesList';

const propTypes = {
  employeeName: PropTypes.string.isRequired,
};

const EmployeeOverview = ({ employeeName }) => {
  // NOTE: Caching subordinates list. Can't use state because we don't want to
  // rerender the tree and moreover this state is not used for rendering anything.
  // Check SubordinatesList component for its usage.
  const fetchedSubordinatesList = useLazyRef(() => new Map());

  return (
    <section data-testid="EmployeeOverview">
      <Title size="medium">Employee Overview</Title>
      <EmployeeSubordinatesList
        employeeName={employeeName}
        fetchedSubordinatesList={fetchedSubordinatesList}
      />
    </section>
  );
};

EmployeeOverview.propTypes = propTypes;

export default memo(EmployeeOverview);
