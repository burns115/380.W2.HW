import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, TouchableOpacity} from "react-native";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";


export interface Character {
    id: string;
    name: string;
    race: string;
    subrace: string,
    mclass: string;
    subclass: string,
    background: string;
}

export function CharViewer () {
    
    const navigation = useNavigation();
    const [characters, setCharacters] = useState<Character[]>([]);

    useFocusEffect(
        React.useCallback(() => {
        const fetchCharacters = async () => {
            try {
                const savedCharacters = await AsyncStorage.getItem('characters');
                const parsedCharacters = savedCharacters ? JSON.parse(savedCharacters) : [];
                setCharacters(parsedCharacters);
            } catch (error) {
                console.error('Error fetching characters:', error);
            }
        };

        fetchCharacters();
    }, []));

    const deleteCharacter = async (characterId: string) => {
        try {
            const existingCharacters = await AsyncStorage.getItem('characters');
            const parsedCharacters = existingCharacters ? JSON.parse(existingCharacters) : [];

            const updatedCharacters = parsedCharacters.filter((character: Character) => character.id !== characterId);

            await AsyncStorage.setItem('characters', JSON.stringify(updatedCharacters));
            setCharacters(updatedCharacters);
        } catch (error) {
            console.error('Error deleting character:', error);
        }
    };

    const confirmDeleteCharacter = (characterId: string) => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this character?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => deleteCharacter(characterId),
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };

    const handleCharacterSelect = (character) => {
        navigation.navigate('CharModal', { character });
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Saved Characters</Text>
            </View>
            {characters.length > 0 ? (
            <FlatList
                data={characters}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.characterRow}>
                        <TouchableOpacity onPress={() => handleCharacterSelect(item)}>
                            <Text style={styles.characterNameText}>
                                {item.name} the {item.background}
                            </Text>
                            <Text style={styles.characterText}>
                                {item.subrace} {item.race}, {item.subclass} {item.mclass}
                            </Text>
                        </TouchableOpacity>   
                        <TouchableOpacity onPress={() => confirmDeleteCharacter(item.id)}>
                            <Ionicons
                            name="close-circle"
                            size={25}
                            color="red"
                            style={styles.deleteIcon}
                            />
                        </TouchableOpacity>
                        
                    </View>
                )}
            />
            ) : (
            <Text style={styles.characterText}>No characters to display</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
      padding: 20,
      paddingTop: 65,
    },
    title: {
      fontSize: 24,
      color: "white", 
      marginBottom: 16,
    },
    deleteButton: {
      backgroundColor: "red",
      padding: 5,
      borderRadius: 5,
      marginTop: 5,
      alignItems: "center",
    },
    deleteButtonText: {
      color: "white",
    },
    titleContainer: {
        alignItems: "center",
    },
    characterRow: {
        flexDirection: "row", 
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 25,
        padding: 10,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 10,
    },
    characterText: {
        flex: 1,
        fontSize: 18,
        color: "red",
    },
    characterNameText: {
        flex: 1,
        fontSize: 22,
        color: "white",
    },
    deleteIcon: {
        marginLeft: 8,
    },
});