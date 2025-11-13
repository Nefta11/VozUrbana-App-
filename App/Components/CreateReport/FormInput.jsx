import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  numberOfLines = 1,
  ...props
}) => {
  return (
    <View style={styles.formGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        placeholder={placeholder}
        placeholderTextColor={colors.textPlaceholder}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? 'top' : 'center'}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: colors.textDark,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
});

export default FormInput;
