import React, {useContext} from "react";
import {
  Dimensions,
  Image,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform
} from "react-native";

import * as Clipboard from "expo-clipboard";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import * as Analytic from "expo-firebase-analytics"

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 130 : StatusBar.currentHeight;

const copyToClipboard = (value) => {
  Clipboard.setString(value);
  alert("Copied to Clipboard! \n" + value);
};


const News = ({ item, darkTheme }) => {
  const { onLogout } = useContext(AuthenticationContext);
  return (
    <View
      style={{
        height: windowHeight - STATUSBAR_HEIGHT,
        width: windowWidth,
        marginBottom: 50.0,
        transform: [{ scaleY: -1 }],
      }}
    >
      <Image
        source={{ uri: item.urlToImage }}
        style={{ height: "30%", resizeMode: "cover", width: windowWidth }}
      />
      <View
        style={{
          ...styles.description,
          backgroundColor: darkTheme ? "#282C35" : "white",
        }}
      >
        <TouchableOpacity onLongPress={copyToClipboard.bind(this, item.title)}>
          <Text
            style={{ ...styles.title, color: darkTheme ? "white" : "black" }}
          >
            {item.title}
          </Text>
        </TouchableOpacity>

        <Text
          style={{ ...styles.content, color: darkTheme ? "white" : "black" }}
        >
          {item.description}
        </Text>
        <Text style={{ color: darkTheme ? "white" : "black" }}>
          Author:
          <Text style={{ fontWeight: "bold" }}>
            {" "}
            {item.author ?? "unknown"}
          </Text>
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={{ fontSize: 15, color: "white" }}>
            `&apos;`{item?.content?.slice(0, 45)}...`&apos;`
          </Text>
          <View style={styles.row}>
          <TouchableOpacity onPress={ async() => {
             await Analytic.logEvent('Tap_News_Link_Button',
             {
               screen: "News_Screen",
               link: item.url
             });
            Linking.openURL(item.url);
            }}>
        
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "red",
                textAlign: "left",
              }}
            >
              Read More
            </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async() => {
                await Analytic.logEvent('Tap_Logout_Button',
                {
                  screen: "News_Screen",
                });
                onLogout();
              }}
              style={styles.roundButton1}
            >
              <Text  style={{
                fontWeight: "bold",
                color: "white",
              }}>Logout</Text>
            </TouchableOpacity>
          </View>
        
      </View>
    </View>
  );
};

export default News;

const styles = StyleSheet.create({
  description: {
    padding: 15,
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    paddingBottom: 10,
    textAlign: "center",
  },
  content: { fontSize: 18, paddingVertical: 10 },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent:'space-between'
  },
  footer: {
    height: 80,
    width: windowWidth,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#A9A9A9",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  roundButton1: {
    width: 70,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 20,
    backgroundColor: "red",
  },
});
