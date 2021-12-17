import React, { useState, useContext } from "react";
import { Text, Button, useWindowDimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SceneMap, TabView } from "react-native-tab-view";
import { SafeArea } from "../utility/safe-area.component";
import TabNavigation from "./tab-navigation.component";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import SearchScreen from "../../features/news/screens/search.screen";
import NewsScreen from "../../features/news/screens/news.screen";
import { NewsContext } from "../../services/news/context";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const layout = useWindowDimensions();

  const {index, setIndex} = useContext(NewsContext);

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
            <TabNavigation index={index} setIndex={setIndex}>
              <Tab.Screen />
            </TabNavigation>
          )}/>
      </SafeArea>
    </>
  );
};

export default Tabs;
