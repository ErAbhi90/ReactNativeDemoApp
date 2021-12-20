import React, { useState, useContext, useEffect } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";

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
import { TouchableOpacity, StyleSheet, View, Text as Reacttext } from "react-native";
import { useTranslation } from 'react-i18next';
import * as Analytics from "expo-firebase-analytics";
export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, error, isLoading, resetData } = useContext(AuthenticationContext);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    resetData();
  }, []);
  return (
    <AccountBackground>
      <AccountCover />
      <Title>{t('AppName')}</Title>
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
        {error && (
          <ErrorContainer size="large">
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer size="large">
          {!isLoading ? (
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              onPress={async () => {
                try {
                  await Analytics.logEvent('Tap_Login_Button',
                    {
                      screen: "Login_Screen",
                      email: email
                    });
                } catch (error) {
                  console.log(error);
                } finally {
                  onLogin(email, password);
                }

              }
              }
            >
              {t('Login')}
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
      </AccountContainer>
      <Spacer size="large">
        <AuthButton mode="contained" onPress={async () => {
          try {
            await Analytics.logEvent('Tap_Back_Button',
              {
                screen: "Login_Screen",

              });

          } catch (error) {
            console.log(error);
          } finally {
            navigation.goBack();
          }

        }}>
          {t('Back')}
        </AuthButton>
      </Spacer>
      <View style={{
        flexDirection: 'row',
        margin: 10,
      }}>
        <TouchableOpacity
          onPress={async () => {
            await Analytics.logEvent('Tap_EN_Button', {
              screen: "Account Screen",
              action: "Switch To English",
            });
            i18n.changeLanguage('en');
          }
          } //Here I change the language to "en" English
          style={Styles.button}>
          <Reacttext style={{ color: '#fff' }}>EN</Reacttext>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await Analytics.logEvent('Tap_FR_Button', {
              screen: "Account Screen",
              action: "Switch To French",
            });
            i18n.changeLanguage('fr');
          }} //Here I change the language to "es" Spanish
          style={Styles.button}>
          <Reacttext style={{ color: '#fff' }}>Fr</Reacttext>
        </TouchableOpacity>
      </View>
    </AccountBackground>
  );
};


const Styles = StyleSheet.create({
  button: {
    backgroundColor: '#61e3a5',
    padding: 10,
    borderRadius: 100,
    margin: 10,
  },
});