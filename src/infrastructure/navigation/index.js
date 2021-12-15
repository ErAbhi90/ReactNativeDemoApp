import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from "./account.navigator";

import { AuthenticationContext } from "../../services/authentication/authentication.context";
import Context from "../../services/news/context";

export const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);
  console.log("isAuthenticated" + isAuthenticated);
  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Context>
          <AppNavigator />
        </Context>
      ) : (
        <AccountNavigator />
      )}
    </NavigationContainer>
  );
};
