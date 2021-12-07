import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Text, Button, StyleSheet, View, StatusBar } from "react-native";
import Tabs from "../..//components/tabs/tabs.component";
import { SafeArea } from "../../components/utility/safe-area.component";

import { AuthenticationContext } from "../../services/authentication/authentication.context";
import Context from "../../services/news/context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
});
export const AppNavigator = () => (

  
  <Context>
    <View style={{ ...styles.container, backgroundColor: "#282C35" }}>
      <Tabs />
    </View>
  </Context>
);
