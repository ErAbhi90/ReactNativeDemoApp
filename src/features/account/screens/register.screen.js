import React, { useState, useContext , useEffect} from "react";

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
import { TouchableOpacity, StyleSheet, View, Text as Reacttext } from "react-native";

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const { onRegister, isLoading, error, resetData } = useContext(AuthenticationContext);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    resetData();
  }, []);

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
      <View style={{
        flexDirection: 'row',
        margin: 10,
      }}>
        <TouchableOpacity
          onPress={async () => {
            await analytics.logEvent('Tap_EN_Button', {
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
            await analytics.logEvent('Tap_FR_Button', {
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