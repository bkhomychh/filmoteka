const saveDataToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

const getDataFromLocalStorage = key => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : undefined;
  } catch (error) {
    console.log(error);
  }
};

export { saveDataToLocalStorage, getDataFromLocalStorage };
