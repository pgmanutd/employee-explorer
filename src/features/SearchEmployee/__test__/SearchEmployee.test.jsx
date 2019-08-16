import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithRouter } from 'shared/utils/testUtils';

import SearchEmployee from '../SearchEmployee';

describe('SearchEmployee', () => {
  const renderComponent = () => renderWithRouter(<SearchEmployee />);
  const inputEmployeeName = ({ getByPlaceholderText }) => employeeName =>
    fireEvent.change(getByPlaceholderText('Employee Name'), {
      target: { value: employeeName },
    });

  describe('Search Link', () => {
    it('should have href attribute without employee name', () => {
      const { getByText } = renderComponent();

      expect(getByText('Search')).toHaveAttribute(
        'href',
        '/employee-overview/',
      );
    });

    it('should have href attribute with employee name when employeeName input is changed', () => {
      const employeeNameInputValue = 'abcd';
      const { getByText, getByPlaceholderText } = renderComponent();

      inputEmployeeName({ getByPlaceholderText })(employeeNameInputValue);

      expect(getByText('Search')).toHaveAttribute(
        'href',
        `/employee-overview/${employeeNameInputValue}`,
      );
    });

    it('should not add employeeName input to localstorage when empty', () => {
      const { getByText, getByPlaceholderText } = renderComponent();

      inputEmployeeName({ getByPlaceholderText })('');

      fireEvent.click(getByText('Search'));

      expect(localStorage.setItem).not.toHaveBeenCalledTimes(1);
    });

    it('should add employeeName input to localstorage when not empty', () => {
      const employeeNameInputValue = 'abcd';
      const { getByText, getByPlaceholderText } = renderComponent();

      inputEmployeeName({ getByPlaceholderText })(employeeNameInputValue);

      fireEvent.click(getByText('Search'));

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'employeeSearchHistory',
        JSON.stringify([employeeNameInputValue]),
      );
    });
  });
});
