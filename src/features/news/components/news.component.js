import React from "react";
import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const News = ({ item, index, darkTheme }) => {
  return (
    <View
      style={{
        height: windowHeight-130.0,
        width: windowWidth,
        marginBottom: 50.0,
        transform: [{ scaleY: -1 }],
      }}
    >
      <Image
        source={{ uri: item.urlToImage }}
        style={{ height: "45%", resizeMode: "cover", width: windowWidth }}
      />
      <View
        style={{
          ...styles.description,
          backgroundColor: darkTheme ? "#282C35" : "white",
        }}
      >
        <Text style={{ ...styles.title, color: darkTheme ? "white" : "black" }}>
          {item.title}
        </Text>
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
      <View
        style={styles.footer}
      >
        <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
          <Text style={{ fontSize: 15, color: "white" }}>
            '{item?.content?.slice(0, 45)}...'
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "red", textAlign:"right" }}>
            Read More
          </Text>
        </TouchableOpacity>
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
  footer: {
    height: 80,
    width: windowWidth,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#A9A9A9",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});