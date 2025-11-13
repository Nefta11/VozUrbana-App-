import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

const PrioritySelector = ({ priorities, selectedPriority, onSelectPriority }) => {
  return (
    <View style={styles.container}>
      <View style={styles.priorityGrid}>
        {priorities.map((p) => (
          <TouchableOpacity
            key={p.value}
            style={[
              styles.priorityCard,
              selectedPriority === p.value && styles.priorityCardActive,
            ]}
            onPress={() => onSelectPriority(p.value)}
          >
            <View style={[styles.priorityCircle, { backgroundColor: p.color }]} />
            <Text style={[
              styles.priorityLabel,
              selectedPriority === p.value && { color: p.color }
            ]}>
              {p.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  priorityGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  priorityCard: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  priorityCardActive: {
    backgroundColor: colors.primary + '10',
    borderColor: colors.primary,
    borderWidth: 2,
  },
  priorityCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginBottom: 12,
  },
  priorityLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    textAlign: 'center',
  },
});

export default PrioritySelector;
