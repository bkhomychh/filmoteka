export const saveDataToLocalStorage = (key: string, data: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export const getDataFromLocalStorage = (key: string): unknown => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
  } catch (error) {
    console.log(error);
  }
};
