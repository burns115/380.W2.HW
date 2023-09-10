import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ItemData = {
  url: string;
  image: string;
  title: string;
  description: string;
};

export const ProductDetails = ({ route }) => {
  const { url } = route.params;
  const [itemData, setItemData] = useState<ItemData | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const checkIsFavorite = async (url: string) => {
    try {
      const existingFavorites = await AsyncStorage.getItem('favorites');
      const parsedFavorites = existingFavorites ? JSON.parse(existingFavorites) : [];
      const isItemInFavorites = parsedFavorites.some((favorite) => favorite.url === url);
      setIsFavorite(isItemInFavorites);
    } catch (error) {
      console.error('Error checking favorites:', error);
    }
  };

  useEffect(() => {
    if (!url) {
      return;
    }
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          let tempData = data;
          tempData.url = url;
          console.log(tempData);
          setItemData(tempData);
          checkIsFavorite(url);
        })
        .catch(error => {
          console.error('Error fetching item data:', error);
        });
  }, [url]);

  const addToFavorites = async (itemData: ItemData) => {
    try {
      const existingFavorites = await AsyncStorage.getItem('favorites');
      const parsedFavorites = existingFavorites ? JSON.parse(existingFavorites) : [];

      const isItemInFavorites = parsedFavorites.some((favorite) => favorite.image === itemData.image);

      if (isItemInFavorites) {
        const updatedFavorites = parsedFavorites.filter((favorite) => favorite.url !== url);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsFavorite(false);
        alert('Product removed from favorites!');
      }else{
        const newFavorite = {
          title: itemData.title,
          description: itemData.description,
          image: itemData.image,
          url: itemData.url,
        };

        parsedFavorites.push(newFavorite);
        await AsyncStorage.setItem('favorites', JSON.stringify(parsedFavorites));
        setIsFavorite(true);
        alert('Product added to favorites!');
      }

    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  return (
    <View style={styles.container}>
      {itemData ? (
        <>
          <Image source={{ uri: itemData.image }} style={styles.picture} resizeMode="contain"/>
          <Text style={styles.title}>{itemData.title}</Text>
          <Text style={styles.desc}>{itemData.description}</Text>
          <Button title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'} onPress={() => addToFavorites(itemData)} />
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