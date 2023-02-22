import { getLocalStorage } from "./helper/localstorage";

const BASE_API = "http:/localhost:3000/";

const LOCAL_STORAGE_TOKEN = "token";

const checkLogged = () => {
  const token = getLocalStorage(LOCAL_STORAGE_TOKEN);
  if (token) {
    return true;
  }
};

const TOKEN = {
  headers: {
    Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`,
  },
};

export { BASE_API, LOCAL_STORAGE_TOKEN, TOKEN, checkLogged };
