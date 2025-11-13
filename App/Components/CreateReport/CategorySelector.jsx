import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';

const CategorySelector = ({ categories, selectedCategory, onSelectCategory }) => {
  const renderIcon = (category, size = 24) => {
    const { fallbackIcon, fallbackType, color } = category;

    switch (fallbackType) {
      case 'MaterialIcons':
        return <MaterialIcons name={fallbackIcon} size={size} color={color} />;
      case 'Ionicons':
        return <Ionicons name={fallbackIcon} size={size} color={color} />;
      default:
        return <MaterialIcons name="info" size={size} color={color} />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Categoria*</Text>
      <View style={styles.categoriesGrid}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryCard,
              selectedCategory === cat.id && styles.categoryCardActive,
            ]}
            onPress={() => onSelectCategory(cat)}
            activeOpacity={0.7}
          >
            <View style={styles.categoryIconContainer}>
              {renderIcon(cat, 24)}
            </View>
            <View style={styles.categoryInfo}>
              <Text style={styles.categoryName}>{cat.nombre}</Text>
              <Text style={styles.categoryDescription}>{cat.descripcion}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={colors.textGray} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 8,
  },
  categoriesGrid: {
    gap: 12,
  },
  categoryCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderLight,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
  },
  categoryCardActive: {
    backgroundColor: colors.primary + '10',
    borderColor: colors.primary,
  },
  categoryIconContainer: {
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 2,
  },
  categoryDescription: {
    fontSize: 14,
    color: colors.textGray,
  },
});

export default CategorySelector;
