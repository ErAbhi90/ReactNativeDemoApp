import React, { useContext } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { categories, sources } from "../../../services/news/api";
import { NewsContext } from "../../../services/news/context";
import Search from "../components/search.component";
import { FlatList } from "react-native-gesture-handler";

const SearchScreen = () => {
  const windowWidth = Dimensions.get("window").width;
  const SLIDE_WIDTH = Math.round(windowWidth / 3.5);

  const { setCategory, setSource, darkTheme } = useContext(NewsContext);

  return (
    <View style={styles.search}>
      <Search />
      <Text
        style={{ ...styles.subtitle, color: darkTheme ? "white" : "black" }}
      >
        Categories
      </Text>
      <FlatList
        horizontal
        data={categories}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => setCategory(item.name)}
              style={styles.category}
            >
              <Image source={{ uri: item.pic }} style={styles.categoryImage}/>
              <Text
                style={{ ...styles.name, color: darkTheme ? "white" : "black" }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
        showsHorizontalScrollIndicator={false}
        sliderWidth={windowWidth}
        itemWidth={SLIDE_WIDTH}
        activeSlideAlignment={"start"}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        keyExtractor={(item) => item.name}
      />
      <Text
        style={{ ...styles.subtitle, color: darkTheme ? "white" : "black" }}
      >
        Sources
      </Text>
      <View style={styles.sources}>
        {sources.map((s) => (
          <TouchableOpacity
            onPress={() => setSource(s.id)}
            key={s.id}
            style={styles.sourceContainer}
          >
            <Image source={{ uri: s.pic }} style={styles.sourceImage} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  search: {
    padding: 10,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 8,
    margin: 10,
    borderBottomColor: "#007FFF",
    borderBottomWidth: 5,
    borderRadius: 10,
  },
  category: {
    height: 120,
    width:90,
    margin: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  categoryImage: {
    height: "60%",
    width: "100%",
    resizeMode: "contain",
  },
  name: {
    fontSize: 13,
    textTransform: "capitalize",
  },
  sources: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  sourceContainer: {
    height: 130,
    width: "40%",
    borderRadius: 100,
    margin: 10,
    backgroundColor: "lightgrey",
  },
  sourceImage: {
    height: "65%",
    margin:20,
    borderRadius: 10,
    alignItems: "center",
    resizeMode: "contain",
  },
});
