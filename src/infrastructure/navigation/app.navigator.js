import React, { useContext } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import Tabs from "../..//components/tabs/tabs.component";
import {NewsContext} from "../../services/news/context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
});

export const AppNavigator = () => {

  const {darkTheme} = useContext(NewsContext)
console.log(StatusBar.currentHeight);
  return (
    
      <View style={{
        ...styles.container,
        backgroundColor: darkTheme ? "#282C35" : "white"
      }}>
        <Tabs />
      </View>
  );
};
