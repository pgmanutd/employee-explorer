import { useState, useEffect } from 'react';

import parseJSON from 'shared/utils/parseJSON';

const eventListenerName = 'onLocalStorageChange';

const removeItemFromLocalStorage = key => {
  localStorage.removeItem(key);
};

const addItemToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItemFromLocalStorage = (key, fallbackValue) => {
  return parseJSON(localStorage.getItem(key), fallbackValue);
};

const useLocalStorage = (key, initialValue) => {
  const [storedItem, setStoredItem] = useState(() => {
    return getItemFromLocalStorage(key, initialValue);
  });

  useEffect(() => {
    const storageListener = ({ detail }) => {
      if (detail.key === key) {
        setStoredItem(detail.item);
      }
    };

    window.addEventListener(eventListenerName, storageListener);

    return () => {
      window.removeEventListener(eventListenerName, storageListener);
    };
  }, [initialValue, key]);

  const setItem = item => {
    setStoredItem(item);

    addItemToLocalStorage(key, item);

    window.dispatchEvent(
      new CustomEvent(eventListenerName, { detail: { key, item } }),
    );
  };

  const removeItem = () => {
    setStoredItem(initialValue);

    removeItemFromLocalStorage(key);

    window.dispatchEvent(
      new CustomEvent(eventListenerName, {
        detail: { key, item: initialValue },
      }),
    );
  };

  return [storedItem, setItem, removeItem];
};

export default useLocalStorage;
