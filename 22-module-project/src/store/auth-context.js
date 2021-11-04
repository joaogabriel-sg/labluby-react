import { createContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext({
  token: null,
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const localStorageTokenKey = "@ReactCompleteCourse:token";
const localStorageExpirationKey = "@ReactCompleteCourse:expiration";

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem(localStorageTokenKey);
  const storedExpirationDate = localStorage.getItem(localStorageExpirationKey);

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem(localStorageTokenKey);
    localStorage.removeItem(localStorageExpirationKey);
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

let logoutTimer = null;

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken = null;
  if (tokenData?.token) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem(localStorageTokenKey);
    localStorage.removeItem(localStorageExpirationKey);

    if (logoutTimer) clearTimeout(logoutTimer);
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem(localStorageTokenKey, token);
    localStorage.setItem(localStorageExpirationKey, expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) logoutTimer = setTimeout(logoutHandler, tokenData.duration);
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
