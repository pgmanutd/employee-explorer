import React from 'react';
import { render } from '@testing-library/react';

import Title from '../Title';

describe('Title', () => {
  const renderComponent = ({ title, size }) =>
    render(<Title size={size}>{title}</Title>);

  it('should render h1 title with default size as "big"', () => {
    const title = 'some title';
    const { getByText } = renderComponent({ title });

    expect(getByText(title)).toContainHTML(
      `<h2 class="display-2">${title}</h2>`,
    );
  });

  it('should render h1 title when size is "large"', () => {
    const title = 'some title';
    const { getByText } = renderComponent({ title, size: 'large' });

    expect(getByText(title)).toContainHTML(
      `<h1 class="display-1">${title}</h1>`,
    );
  });

  it('should render h2 title when size is "big"', () => {
    const title = 'some title';
    const { getByText } = renderComponent({ title, size: 'big' });

    expect(getByText(title)).toContainHTML(
      `<h2 class="display-2">${title}</h2>`,
    );
  });

  it('should render h3 title when size is "medium"', () => {
    const title = 'some title';
    const { getByText } = renderComponent({ title, size: 'medium' });

    expect(getByText(title)).toContainHTML(
      `<h3 class="display-3">${title}</h3>`,
    );
  });

  it('should render h4 title when size is "small"', () => {
    const title = 'some title';
    const { getByText } = renderComponent({ title, size: 'small' });

    expect(getByText(title)).toContainHTML(
      `<h4 class="display-4">${title}</h4>`,
    );
  });
});
