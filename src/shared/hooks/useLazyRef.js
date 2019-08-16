import { useRef, useDebugValue } from 'react';

const useLazyRef = lazyInitializer => {
  const ref = useRef(null);
  const { current } = ref;

  useDebugValue(current);

  if (current !== null) {
    return ref;
  }

  const lazyInitializerValue = lazyInitializer();

  ref.current = lazyInitializerValue;

  return ref;
};

export default useLazyRef;
