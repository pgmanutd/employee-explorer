import React, { memo } from 'react';

const Spinner = (props) => (
  <div
    data-testid="Spinner"
    className="d-flex justify-content-center"
    {...props}
  >
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default memo(Spinner);
