import { View, Text, TouchableOpacity, Share } from "react-native";
import { Character } from "./CharViewer";
import { StyleSheet } from "react-native";

interface CharModalProps {
    route: {
      params: { character: Character; };
    };
}

export const CharModal: React.FC<CharModalProps> = ({ route }) => {
    const { character } = route.params;

    const characterData = `Character: ${character.name}, ${character.race}, ${character.mclass}, ${character.background}`;

    const shareCharacter = async () => {
        try {
            Share.share({
              message: characterData,
            });
          } catch (error) {
            console.error("Error sharing character data:", error);
          }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Name: {character.name}</Text>
        <Text style={styles.text}>Race: {character.race}</Text>
        <Text style={styles.text}>Subrace: {character.subrace}</Text>
        <Text style={styles.text}>Class: {character.mclass}</Text>
        <Text style={styles.text}>Subclass: {character.subclass}</Text>
        <Text style={styles.text}>Background: {character.background}</Text>

        <TouchableOpacity onPress={shareCharacter} style={styles.shareButton}>
            <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
      padding: 16,
    },
    title: {
      fontSize: 24,
      color: "white",
      marginBottom: 16,
    },
    text: {
      fontSize: 18,
      color: "red",
      marginBottom: 12,
    },
    shareButton: {
      backgroundColor: "red",
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    buttonText: {
      color: "white",
      fontSize: 18,
    },
  });