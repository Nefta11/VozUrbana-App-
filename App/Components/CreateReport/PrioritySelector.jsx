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
              selectedPriority === p.value && { color: colors.textDark, fontWeight: '600' }
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
    flexDirection: 'column',
    gap: 12,
  },
  priorityCard: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E5E5',
    minHeight: 100,
  },
  priorityCardActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#2563EB',
    borderWidth: 2,
  },
  priorityCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginBottom: 12,
  },
  priorityLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textDark,
    textAlign: 'center',
  },
});

export default PrioritySelector;