import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';

interface FavoriteItem {
    url: string;
    title: string;
    description: string;
    image: string;
  }

const FavoritesPage = ({ navigation }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useFocusEffect(
    React.useCallback(() => {
    const getFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error('Error retrieving favorites:', error);
      }
    };

    getFavorites();
  }, []));

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.favoriteItem}
            onPress={() => {
              console.log('Clicked URL:', item);
              navigation.navigate('ProductDetailsStack', {
                screen: "ProductDetails",
                params: { url: item.url }
              })
            }}
          >
            <View style={styles.favoriteItem}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
      },
      favoriteItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
      },
      image: {
        width: 50,
        height: 50,
        marginRight: 10,
      },
      title: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      description: {
        color: '#666',
      },
      unfavoriteButton: {
        backgroundColor: 'red',
        color: 'white',
        padding: 6,
        borderRadius: 6,
        marginLeft: 10,
      },
      textContainer: {
        flex: 1,
      },
});

export default FavoritesPage;