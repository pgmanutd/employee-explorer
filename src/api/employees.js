const _map = require('lodash/fp/map');
const _capitalize = require('lodash/fp/capitalize');
const _split = require('lodash/fp/split');
const _join = require('lodash/fp/join');
const _compose = require('lodash/fp/compose');
const _compact = require('lodash/fp/compact');

const employees = {
  'John Hartman': {
    name: 'John Hartman',
    position: 'CEO',
    directSubordinates: () => [
      employees['Samad Pitt'].name,
      employees['Leanna Hogg'].name,
    ],
  },
  'Samad Pitt': {
    name: 'Samad Pitt',
    position: 'production supervisor',
    directSubordinates: () => [
      employees['Aila Hodgson'].name,
      employees['Amaya Knight'].name,
    ],
  },
  'Leanna Hogg': {
    name: 'Leanna Hogg',
    position: 'marketing supervisor',
    directSubordinates: () => [
      employees['Vincent Todd'].name,
      employees['Faye Oneill'].name,
      employees['Lynn Haigh'].name,
      employees['Aila Hodgson'].name,
    ],
  },
  'Aila Hodgson': {
    name: 'Aila Hodgson',
    position: 'employee',
  },
  'Amaya Knight': {
    name: 'Amaya Knight',
    position: 'employee',
  },
  'Vincent Todd': {
    name: 'Vincent Todd',
    position: 'employee',
  },
  'Faye Oneill': {
    name: 'Faye Oneill',
    position: 'employee',
  },
  'Lynn Haigh': {
    name: 'Lynn Haigh',
    position: 'marketing supervisor',
    directSubordinates: () => [employees['Nylah Riddle'].name],
  },
  'Nylah Riddle': {
    name: 'Nylah Riddle',
    position: 'employee',
  },
};

const capitalizeEachWord = _map(_capitalize);

module.exports = (req, res) => {
  const { employeeName } = req.params;

  if (!employeeName) {
    return res.json(_map('name', employees));
  }

  const employeeDetails =
    employees[
      _compose(_join(' '), capitalizeEachWord, _split(' '))(employeeName)
    ];

  if (!employeeDetails) {
    return res.json({});
  }

  res.json(
    _compact([
      employeeDetails.position,
      employeeDetails.directSubordinates && {
        'direct-subordinates': employeeDetails.directSubordinates(),
      },
    ]),
  );
};
