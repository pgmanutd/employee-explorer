import React, { memo } from 'react';
import PropTypes from 'prop-types';

import EmployeeOverview from './EmployeeOverview';

const propTypes = {
  match: PropTypes.object.isRequired,
};

const EmployeeOverviewContainer = ({ match }) => (
  <EmployeeOverview employeeName={match.params.employeeName} />
);

EmployeeOverviewContainer.propTypes = propTypes;

export default memo(EmployeeOverviewContainer);
