import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _values from 'lodash/fp/values';

const sizes = {
  large: 'large',
  big: 'big',
  medium: 'medium',
  small: 'small',
};

const propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(_values(sizes)),
};

const defaultProps = {
  size: sizes.big,
};

const Title = ({ children, size }) =>
  ({
    [sizes.large]: () => <h1 className="display-1">{children}</h1>,
    [sizes.big]: () => <h2 className="display-2">{children}</h2>,
    [sizes.medium]: () => <h3 className="display-3">{children}</h3>,
    [sizes.small]: () => <h4 className="display-4">{children}</h4>,
  }[size]());

Title.propTypes = propTypes;
Title.defaultProps = defaultProps;

export default memo(Title);
