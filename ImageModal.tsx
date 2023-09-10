import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export const ImageModal = ({ route }) => {
  const {image} = route.params;

  return (
    <View style={styles.modalContainer}>
      <Image source={{ uri: image.url }} style={styles.modalImage} resizeMode="contain" />
    </View>
  )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width: 400,
        height: 400,
    },
});
