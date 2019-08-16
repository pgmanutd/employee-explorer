import _pathOr from 'lodash/fp/pathOr';
import _reject from 'lodash/fp/reject';
import _compose from 'lodash/fp/compose';
import _tap from 'lodash/fp/tap';

export const isEmployeePresent = Array.isArray;

// NOTE: We are traversing a tree with many nodes in parallel.
// #fetchedSubordinatesList Map is used for caching fetched employee and passed
// recursively down the tree.
//          1
//       /     \
//      2        3
//  / /  \ \      \
// 4 5  *6* 7     *6*
export const getSubordinates = ({ fetchedSubordinatesList }) =>
  _compose(
    _tap(directSubordinates =>
      // NOTE: A sideEffect. So kept this in tap method.
      directSubordinates.forEach(directSubordinate =>
        fetchedSubordinatesList.current.set(directSubordinate, true),
      ),
    ),
    _reject(
      fetchedSubordinatesList.current.has.bind(fetchedSubordinatesList.current),
    ),
    _pathOr([], 'direct-subordinates'),
    _pathOr(null, '[1]'),
  );

export const getEmployeePosition = _pathOr('N/A', '[0]');
