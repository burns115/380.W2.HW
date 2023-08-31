import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface FavoriteItem {
    url: string;
    title: string;
    description: string;
    image: string;
  }

const FavoritesPage = ({ navigation }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
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
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.favoriteItem} onPress={() => navigation.navigate('ProductDetails', { url: item.url })}>
            <Image source={{ uri: item.image }} style={styles.image}/>
            <Text style={styles.title}>{item.title}</Text>
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
});

export default FavoritesPage;