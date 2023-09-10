import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export const DetailsPage = ({ route, navigation }) => {
  const { image } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image Details</Text>
      <Text style={styles.imageUrl}>Image URL: {image.url}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Modal', { image })}>
        <Image source={{ uri: image.url }} style={styles.modalTriggerImage} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#838081',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  imageUrl: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: "black"
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalTriggerImage: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "black"
  },
});
