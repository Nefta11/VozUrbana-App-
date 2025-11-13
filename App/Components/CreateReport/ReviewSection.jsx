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
  return (
    <View style={styles.reviewSection}>
      <View style={styles.reviewItem}>
        <Text style={styles.reviewLabel}>Información Básica</Text>
        <Text style={styles.reviewValue}>Título: {titulo || 'Sin título'}</Text>
        <Text style={styles.reviewValue}>Descripción: {descripcion || 'Sin descripción'}</Text>
      </View>

      <View style={styles.reviewItem}>
        <Text style={styles.reviewLabel}>Categoria y Prioridad</Text>
        <Text style={styles.reviewValue}>
          Categoria: {categoryData?.nombre || 'Sin categoría'}
        </Text>
        <Text style={styles.reviewValue}>
          Prioridad: {priorities.find(p => p.value === prioridad)?.label || 'Sin prioridad'}
        </Text>
      </View>

      <View style={styles.reviewItem}>
        <Text style={styles.reviewLabel}>Ubicación</Text>
        <Text style={styles.reviewValue}>
          Dirección: {ubicacion || 'Sin ubicación'}
        </Text>
        <Text style={styles.reviewValue}>
          Coordenadas: {coordenadas || 'Sin coordenadas'}
        </Text>
      </View>

      {imagen && (
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Imagen adjunta</Text>
          <Image source={{ uri: imagen }} style={styles.reviewImage} />
          <Text style={styles.reviewImageInfo}>
            Imagen seleccionada correctamente
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  reviewSection: {
    gap: 20,
  },
  reviewItem: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  reviewLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 8,
  },
  reviewValue: {
    fontSize: 14,
    color: colors.textGray,
    marginBottom: 4,
  },
  reviewImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  reviewImageInfo: {
    fontSize: 12,
    color: colors.textGray,
    fontStyle: 'italic',
  },
});

export default ReviewSection;
