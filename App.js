import React from 'react';
import { StyleSheet, Text, View , StatusBar} from 'react-native';
import Tabs from './src/components/tabs/tabs.component';
import Context from './src/services/news/context';

function App() {
  return (
    <View style={{...styles.container, backgroundColor: "#282C35"}}>
      <Tabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
});

export default ()=>{
  return(<Context>
    <App/>
  </Context>);
  
}