import React from "react";

import { Spacer } from "../../../components/spacer/spacer.component";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  Title,
} from "../components/account.styles";
import { useTranslation } from 'react-i18next';
import { TouchableOpacity,StyleSheet, Text, View } from "react-native";
import * as analytics from "expo-firebase-analytics";
import i18n from "../../../services/translation/i18n";

export const AccountScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  return (
    <AccountBackground>
      <AccountCover />
      <Title>{t('AppName')}</Title>
      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={async () => {
            try {
              analytics.setDebugModeEnabled(true);
              analytics.setUnavailabilityLogging(true);
              await analytics.logEvent('Log_In_Event', {
                appName: "Demo App"
              });
            } catch (e) {
              console.log(e);
            }finally{
              navigation.navigate("Login")
            }
            
           
          }}
        >
          {t('Login') }
        </AuthButton>
        <Spacer size="large">
          <AuthButton
            icon="email"
            mode="contained"
            onPress={async () => {
              try {
                analytics.setDebugModeEnabled(true);
                analytics.setUnavailabilityLogging(true);
                await analytics.logEvent('Register_Event', {
                  appName: "Demo App"
                });
              } catch (e) {
                console.log(e);
              }finally{
                navigation.navigate("Register")
              }
          
             
            }}
          >
            {t('Register') }
          </AuthButton>
        </Spacer>
      </AccountContainer>
      <View style={{
        flexDirection: 'row',
          margin: 10,
        }}>
      <TouchableOpacity
          onPress={() => i18n.changeLanguage('en')} //Here I change the language to "en" English
          style={Styles.button}>
          <Text style={{color: '#fff'}}>EN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => i18n.changeLanguage('fr')} //Here I change the language to "es" Spanish
          style={Styles.button}>
          <Text style={{color: '#fff'}}>Fr</Text>
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