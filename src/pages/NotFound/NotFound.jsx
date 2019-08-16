import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import routePaths from 'shared/settings/routePaths';

import Title from 'shared/components/Title';

const NotFound = () => (
  <section data-testid="NotFound" className="jumbotron">
    <Title size="big">Oops!</Title>
    <Title size="small">404 Not Found</Title>
    <p className="lead">
      Sorry, an error has occurred, Requested page not found!
    </p>
    <hr className="my-4" />
    <Link
      className="btn btn-primary btn-lg"
      role="button"
      to={routePaths.employeeExplorer}
    >
      Take me to employee explorer page
    </Link>
  </section>
);

export default memo(NotFound);
