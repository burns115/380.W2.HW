import { StyleSheet, Text, View } from 'react-native';
import { AccelerometerSDK } from './AccelerometerSDK';

export default function Battery() {
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
