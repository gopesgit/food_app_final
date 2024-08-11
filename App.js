import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { colors, globalStyle } from './src/global/styles';

export default function App() {
  return (
    <View style={styles.container}>      
      <RootNavigator/>     
      <StatusBar
        barStyle="light-content"
        backgroundColor={"rgba(255,255,255,1)"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff",     
  },
});
