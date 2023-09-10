import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { BatterySDK } from '../../Battery/BatterySDK';
import { AccelerometerSDK } from '../../Battery/AccelerometerSDK';

export default function App() {
  return (
    <View style={styles.container}>
      <AccelerometerSDK />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
