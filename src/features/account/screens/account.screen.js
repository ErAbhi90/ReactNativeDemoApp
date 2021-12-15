import React from "react";

import { Spacer } from "../../../components/spacer/spacer.component";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  Title,
} from "../components/account.styles";
import * as analytics from "expo-firebase-analytics";
export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover />
      <Title>Demo App</Title>
      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={async () => {
            analytics.setDebugModeEnabled(true);
            analytics.setUnavailabilityLogging(true);
            await analytics.logEvent('Log_In_Event', {
              appName: "Demo App"
            });
            navigation.navigate("Login")
          }}
        >
          Login
        </AuthButton>
        <Spacer size="large">
          <AuthButton
            icon="email"
            mode="contained"
            onPress={async () => {
              analytics.setDebugModeEnabled(true);
              analytics.setUnavailabilityLogging(true);
              await analytics.logEvent('Register_Event', {
                appName: "Demo App"
              });
              navigation.navigate("Register")
            }}
          >
            Register
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
