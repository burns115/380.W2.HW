import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ItemData = {
  url: string;
  image: string | undefined;
  title: string;
  description: string;
};

const removeFromFavorites = async (itemUrl: string) => {
  try {
    const existingFavorites = await AsyncStorage.getItem('favorites');
    const parsedFavorites = existingFavorites ? JSON.parse(existingFavorites) : [];

    const updatedFavorites = parsedFavorites.filter(favorite => favorite.url !== itemUrl);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    setFavorites(updatedFavorites);
  } catch (error) {
    console.error('Error removing from favorites:', error);
  }
};

const addToFavorites = async (itemData: ItemData) => {
  try {
    const existingFavorites = await AsyncStorage.getItem('favorites');
    const parsedFavorites = existingFavorites ? JSON.parse(existingFavorites) : [];

    const isItemInFavorites = parsedFavorites.some((favorite) => favorite.image === itemData.image);

    if (isItemInFavorites) {
      alert('This item is already in your favorites.');
      return;
    }

    

    const newFavorite = {
      title: itemData.title,
      description: itemData.description,
      image: itemData.image,
      url: itemData.url,
    };

    parsedFavorites.push(newFavorite);
    await AsyncStorage.setItem('favorites', JSON.stringify(parsedFavorites));

    alert('Product added to favorites!');
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};

export const ProductDetails = ({ route }) => {
  const { url } = route.params;
  const [itemData, setItemData] = useState<ItemData | null>(null);

  useEffect(() => {

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setItemData(data);
      })
      .catch(error => {
        console.error('Error fetching item data:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {itemData ? (
        <>
          <Image source={{ uri: itemData.image }} style={styles.picture} resizeMode="contain"/>
          <Text style={styles.title}>{itemData.title}</Text>
          <Text style={styles.desc}>{itemData.description}</Text>
          <Button title="Add to Favorites" onPress={() => addToFavorites(itemData)} />
          {favorites.some(favorite => favorite.url === itemData.url) && (
          <TouchableOpacity onPress={() => removeFromFavorites(itemData.url)}>
            <Text style={styles.unfavoriteButton}>Unfavorite</Text>
          </TouchableOpacity>
      )}
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'black',
  },
  picture: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  desc: {
    textAlign: 'center',
    color: 'white',
  },
  unfavoriteButton: {
    backgroundColor: 'red',
    color: 'white',
    padding: 6,
    borderRadius: 6,
    marginLeft: 10,
  },
});