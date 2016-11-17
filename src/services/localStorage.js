export const set = (key, payload) => {
  localStorage.setItem(key, JSON.stringify(payload));
  return new Promise(resolve => resolve({ key, payload }));
};

export const get = (key) => {
  const item = localStorage.getItem(key);
  return new Promise(resolve => resolve(JSON.parse(item)));
};
