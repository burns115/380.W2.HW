import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

export interface ImageData {
    id: number;
    url: string;
    width: number;
    height: number;
}

interface ItemCardProps extends ImageData {
    isSelected: boolean;
}

export const ItemCard = ({ url }: ImageData) => {
    return (
        <View
        style={styles.cardStyle}
        >
        <Image
            source={{ uri: url }}
            style={styles.imageStyle}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    cardStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
        margin: 5,
    },
    imageStyle: {
        width: 125, 
        height: 125, 
    }
});

export default ItemCard;