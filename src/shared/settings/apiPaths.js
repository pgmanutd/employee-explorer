const apiPaths = {
  employees: () => '/api/employees',
  employeeDetails: ({ employeeName }) => `/api/employees/${employeeName}`,
};

export default apiPaths;
