import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import * as ImagePicker from 'expo-image-picker';

const MapSelector = ({ coordenadas, onMapSelect, onImageSelect }) => {
  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos', 'Se necesitan permisos para acceder a las fotos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      onImageSelect(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Dirección*</Text>
        <Text style={styles.input}>{coordenadas || '20.274500, -97.955700'}</Text>
      </View>

      <Text style={styles.mapLabel}>Selecciona en el mapa</Text>

      <TouchableOpacity style={styles.mapButton} onPress={onMapSelect}>
        <MaterialIcons name="location-pin" size={20} color={colors.textWhite} />
        <Text style={styles.mapButtonText}>Haz clic en el mapa para seleccio...</Text>
      </TouchableOpacity>

      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <MaterialIcons name="map" size={64} color={colors.borderLight} />
          <Text style={styles.mapPlaceholderText}>Vista del mapa</Text>
          <TouchableOpacity style={styles.mapSelectButton} onPress={onMapSelect}>
            <MaterialIcons name="add" size={24} color={colors.textWhite} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapZoomIn}>
            <MaterialIcons name="add" size={20} color={colors.textDark} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapZoomOut}>
            <MaterialIcons name="remove" size={20} color={colors.textDark} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.uploadSection}>
        <TouchableOpacity style={styles.uploadImageButton} onPress={handleSelectImage}>
          <MaterialIcons name="file-upload" size={24} color={colors.primary} />
          <Text style={styles.uploadImageText}>Subir imagen</Text>
        </TouchableOpacity>
        <Text style={styles.uploadImageSubtext}>PNG, GIF, WEBP, hasta 5MB</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textGray,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  mapLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 12,
  },
  mapButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  mapButtonText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '500',
  },
  mapContainer: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    position: 'relative',
  },
  mapPlaceholderText: {
    fontSize: 16,
    color: colors.textGray,
    marginTop: 8,
  },
  mapSelectButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.primary,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapZoomIn: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: colors.backgroundLight,
    width: 36,
    height: 36,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  mapZoomOut: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: colors.backgroundLight,
    width: 36,
    height: 36,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  uploadSection: {
    alignItems: 'center',
  },
  uploadImageButton: {
    backgroundColor: colors.primary + '10',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  uploadImageText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  uploadImageSubtext: {
    fontSize: 12,
    color: colors.textGray,
    marginTop: 4,
  },
});

export default MapSelector;
