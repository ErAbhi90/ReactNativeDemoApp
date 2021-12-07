import React, { useState, useContext } from "react";
import { Text, Button, useWindowDimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SceneMap, TabView } from "react-native-tab-view";
import NewsScreen from "../../screens/news.screen";
import SearchScreen from "../../screens/search.screen";
import { SafeArea } from "../utility/safe-area.component";
import TabNavigation from "./tab-navigation.component";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

const Tab = createBottomTabNavigator();
const Settings = () => {
  const { onLogout } = useContext(AuthenticationContext);
  return (
    <SafeArea>
      <Text>Settings</Text>
      <Button title="Logout" onPress={() => onLogout()} />
    </SafeArea>
  );
};
const Tabs = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(1);

  const [routes] = useState([
    { key: "first", title: "Search" },
    { key: "second", title: "News" },
    { key: "third", title: "Settings" },
  ]);

  const renderScene = SceneMap({
    first: SearchScreen,
    second: NewsScreen,
    third: Settings,
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
              <Tab.Screen name="Setting" component={Settings} />
            </TabNavigation>
          )}/>
      </SafeArea>
    </>
  );
};

export default Tabs;
