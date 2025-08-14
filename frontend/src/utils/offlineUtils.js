export const saveOfflineData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const loadOfflineData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const clearOfflineData = (key) => {
  localStorage.removeItem(key);
};

export const isOnline = () => {
  return navigator.onLine;
};
