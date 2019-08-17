import React, { memo } from 'react';

import Title from 'shared/components/Title';

import SearchEmployee from 'features/SearchEmployee';
import SearchEmployeeHistory from 'features/SearchEmployeeHistory';
import AvailableEmployees from 'features/AvailableEmployees';

const EmployeeExplorer = () => (
  <section data-testid="EmployeeExplorer">
    <Title size="medium">Employee Explorer</Title>
    <SearchEmployee />
    <SearchEmployeeHistory />
    <AvailableEmployees />
  </section>
);

export default memo(EmployeeExplorer);
