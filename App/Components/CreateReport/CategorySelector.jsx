import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';

const CategorySelector = ({ categories, selectedCategory, onSelectCategory }) => {
  const renderCategoryIcon = (category, size = 24) => {
    // Usar color azul para todos los iconos como en HomeScreen
    return renderFallbackIcon(category.fallbackIcon, category.fallbackType, size, '#465eef');
  };

  const renderFallbackIcon = (iconName, iconType, size, color) => {
    switch (iconType) {
      case 'MaterialIcons':
        return <MaterialIcons name={iconName} size={size} color={color} />;
      case 'Ionicons':
        return <Ionicons name={iconName} size={size} color={color} />;
      default:
        return <MaterialIcons name="info" size={size} color={color} />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Categoria*</Text>
      <View style={styles.categoriesGrid}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.newCategoryCard,
              selectedCategory === category.id && styles.categoryCardActive,
            ]}
            onPress={() => onSelectCategory(category)}
            activeOpacity={0.7}
          >
            <View style={[styles.newCategoryIcon, { backgroundColor: '#dbe1fb' }]}>
              {renderCategoryIcon(category, 24)}
            </View>
            <View style={styles.categoryTextContainer}>
              <Text style={styles.newCategoryName}>{category.nombre}</Text>
              <Text style={styles.newCategoryDescription}>{category.descripcion}</Text>
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
    gap: 8,
  },
  newCategoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryCardActive: {
    backgroundColor: '#FFFFFF',
    borderColor: colors.primary,
    borderWidth: 2,
  },
  newCategoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  categoryTextContainer: {
    flex: 1,
  },
  newCategoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 4,
  },
  newCategoryDescription: {
    fontSize: 14,
    color: colors.textGray,
    lineHeight: 18,
  },
});

export default CategorySelector;
