import React, { useState, createContext } from "react";
import * as firebase from "firebase";

import { loginRequest, createUserRequest, signOutRequest } from "./authentication.service";
import * as Analytics from "expo-firebase-analytics"
export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  firebase.auth().onAuthStateChanged((usr) => {
    if (usr) {
      setUser(usr);
      setError(null);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        console.log(u);
        setUser(u);
        Analytics.setUserId(u.email);
        setError(null);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e.toString);
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);
    if (password !== repeatedPassword) {
      setError("Error: Passwords do not match");
      return;
    }
    createUserRequest(email, password)
      .then((u) => {
        setUser(u);
        Analytics.setUserId(u.email);
        setError(null);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onLogout = () => {
    signOutRequest()
      .then(() => {
        resetData();
      });
  };
  const resetData = () => {
    setUser(null);
    setError(null);
    Analytics.resetAnalyticsData;
  }
  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
        resetData,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
