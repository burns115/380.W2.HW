import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import BatteryIcon from './BatteryIcon';

export function AccelerometerSDK() {
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [subscription, setSubscription] = useState<Accelerometer.Subscription | null>(null);

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(({ x }) => {
        if (Math.abs(x) > 3) {
          if (batteryLevel < 100) {
            setBatteryLevel(prevLevel => {
              const newLevel = Math.min(prevLevel + 1, 100);
              return newLevel
            });
          }
        }
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Shake to Charge!</Text>
      <BatteryIcon batteryLevel={batteryLevel} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
});