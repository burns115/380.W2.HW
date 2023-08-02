import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';

interface ImageModalProps {
  isVisible: boolean;
  imageUrl: string;
  onClose: () => void;
}

const screenWidth = Dimensions.get('window').width;
const modalWidth = screenWidth - 40;

const ImageModal = ({ isVisible, imageUrl, onClose }: ImageModalProps) => {
  return (
    <Modal animationType="fade" visible={isVisible} transparent>
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={onClose} style={styles.modalBackground}>
          <Image source={{ uri: imageUrl }} style={styles.modalImage} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default ImageModal;