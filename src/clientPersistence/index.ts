export const persistValue = (key: string, value: string) => {
  localStorage.setItem(key, value);
};
export const getPersistedValue = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const removePersistedValue = (key: string) => {
  return localStorage.removeItem(key);
};
