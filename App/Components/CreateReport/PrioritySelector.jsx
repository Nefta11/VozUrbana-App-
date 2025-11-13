import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

const PrioritySelector = ({ priorities, selectedPriority, onSelectPriority }) => {
  return (
    <View style={styles.container}>
      {priorities.map((p) => (
        <TouchableOpacity
          key={p.value}
          style={[
            styles.priorityCard,
            selectedPriority === p.value && styles.priorityCardActive,
          ]}
          onPress={() => onSelectPriority(p.value)}
        >
          <View style={[styles.priorityDot, { backgroundColor: p.color }]} />
          <Text style={[
            styles.priorityLabel,
            selectedPriority === p.value && { color: p.color }
          ]}>
            {p.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  priorityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: 8,
  },
  priorityCardActive: {
    backgroundColor: colors.primary + '10',
    borderColor: colors.primary,
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  priorityLabel: {
    fontSize: 16,
    color: colors.textDark,
  },
});

export default PrioritySelector;
