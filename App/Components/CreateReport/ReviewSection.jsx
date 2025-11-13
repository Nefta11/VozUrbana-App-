import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

const ReviewSection = ({
  titulo,
  descripcion,
  categoria,
  categoryData,
  prioridad,
  priorities,
  ubicacion,
  coordenadas,
  imagen
}) => {
  const getPriorityLabel = () => {
    return priorities.find(p => p.value === prioridad)?.label || 'Media';
  };

  return (
    <View style={styles.reviewContainer}>
      {/* Información Básica */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Información Básica</Text>
        <Text style={styles.sectionValue}>{titulo || 'Fuga de agua en Av. Principal'}</Text>
        <Text style={styles.sectionDescription}>{descripcion || 'Describe detalladamente el problema...'}</Text>
      </View>

      {/* Categoria y Prioridad */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Categoria y Prioridad</Text>
        <Text style={styles.sectionValue}>Categoria: {categoryData?.nombre || 'Servicios Públicos'}</Text>
        <Text style={styles.sectionValue}>Prioridad: {getPriorityLabel()}</Text>
      </View>

      {/* Ubicación */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Ubicación</Text>
        <Text style={styles.sectionValue}>
          Dirección: {ubicacion || 'Loma Chica, Colonia Agustín Olvera, Acatlán, Hidalgo, 43703, México'}
        </Text>
        <Text style={styles.sectionValue}>
          Coordenadas: {coordenadas || '20.107342, -98.469086'}
        </Text>
      </View>

      {/* Imagen */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Imagen</Text>
        {imagen ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imagen }} style={styles.reviewImage} />
            <Text style={styles.imageInfo}>
              Imagen seleccionada correctamente - 0.19 mb
            </Text>
          </View>
        ) : (
          <Text style={styles.sectionValue}>Sin imagen adjunta</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    flex: 1,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 8,
  },
  sectionValue: {
    fontSize: 14,
    color: colors.textGray,
    lineHeight: 20,
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: colors.textGray,
    lineHeight: 20,
  },
  imageContainer: {
    marginTop: 8,
  },
  reviewImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  imageInfo: {
    fontSize: 12,
    color: colors.textGray,
    fontStyle: 'italic',
  },
});

export default ReviewSection;
