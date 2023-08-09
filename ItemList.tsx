import { useState } from 'react';
import { FlatList, TextInput, TouchableOpacity, View } from 'react-native';
import { ItemCard } from './ItemCard';
import { StyleSheet } from 'react-native';
import { ImageData } from './ItemCard';
import { Dimensions } from 'react-native';

const numColumns = 3;
const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / numColumns;
const itemHeight = itemWidth * 2;

const PICS: ImageData[] = [];
for (let i = 1; i < 70; i++) {
  PICS.push({ id: i, url: `https://picsum.photos/id/${i}/200`, width: itemWidth, height: itemHeight});
}

export const ItemList = ({ navigation }) => 
{
    const [searchQuery, setSearchQuery] = useState('');
    const [activeItems, setActiveItems] = useState(PICS);

    const search = (query: string) => {
        const filteredItems = PICS.filter((contact) => 
        contact.id.toString().toLowerCase().includes(query.toLowerCase()));
        setActiveItems(filteredItems);
        setSearchQuery(query);
    }

    return (
        <View style={styles.container}>
            <TextInput 
                value={searchQuery}
                onChangeText={search}
                placeholder='Search Here'
                style={styles.input}
            />

            <FlatList 
                data={activeItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Details', { image: item })}>
                        <ItemCard id={item.id} url={item.url} width={itemWidth} height={itemHeight} />
                    </TouchableOpacity>
                )}
                numColumns={numColumns}
                contentContainerStyle={styles.flatListContent}
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#838081',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    input: {
        width: '50%', 
        borderColor: 'black', 
        borderWidth: 2, 
        marginVertical: 60,
        paddingHorizontal: 10,
        backgroundColor: 'white'
    },
    flatListContent: {
        alignItems: 'center',
        flexGrow: 1,
        
    },
    imageOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedImage: {
        width: '90%',
        height: '90%',
    },
});