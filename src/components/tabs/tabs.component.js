import React, { useState } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import NewsScreen from "../../screens/news.screen";
import SearchScreen from "../../screens/search.screen";
import { SafeArea } from "../utility/safe-area.component";
import TabNavigation from "./tab-navigation.component";

const Tabs = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(1);

  const [routes] = useState([
    { key: "first", title: "Search" },
    { key: "second", title: "News" },
  ]);

  const renderScene = SceneMap({
    first: SearchScreen,
    second: NewsScreen,
  });

  return (
    <>
      <SafeArea>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={() => (
            <TabNavigation index={index} setIndex={setIndex} />
          )}
        />
      </SafeArea>
    </>
  );
};

export default Tabs;
