import React, { useState, useContext } from "react";

import { ActivityIndicator, Colors } from "react-native-paper";
import { useTranslation } from 'react-i18next';

import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "../components/account.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import * as analytics from "expo-firebase-analytics";
export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const { onRegister, isLoading, error } = useContext(AuthenticationContext);
  const { t } = useTranslation();

  return (
    <AccountBackground>
      <AccountCover />
      <Title>{ t('AppName')}</Title>
      <AccountContainer>
        <AuthInput
          label="E-mail"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setEmail(u)}
        />
        <Spacer size="large">
          <AuthInput
            label={t('Password')}
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setPassword(p)}
          />
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label={t('RepeatPass')}
            value={repeatedPassword}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setRepeatedPassword(p)}
          />
        </Spacer>
        {error && (
          <ErrorContainer size="large">
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer size="large">
          {!isLoading ? (
            <AuthButton
              icon="email"
              mode="contained"
              onPress={ async() => {
                try {
                  await analytics.logEvent('Register_Event', {
                    action: "Tap_Register_Button"
                  });
                } catch (error) {
                  console.log(error);
                }finally {
                  onRegister(email, password, repeatedPassword)
                }
              }}
            >
              { t('Register')}
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
      </AccountContainer>
      <Spacer size="large">
        <AuthButton mode="contained" onPress={async() => {
           try {
            await analytics.logEvent('Back_From_Register_Screen', {
              action: "Tap_Back_Button"
            });
          } catch (error) {
            console.log(error);
          }finally {
            navigation.goBack();
          }
        }}>
          { t('Back')}
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
