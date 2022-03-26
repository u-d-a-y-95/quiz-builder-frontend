export const getLocalData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : {};
};

export const setLocalData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
