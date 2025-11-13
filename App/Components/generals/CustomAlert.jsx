import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';

const CustomAlert = ({
  visible,
  title,
  message,
  type = 'error', // 'error', 'success', 'warning', 'info'
  onClose,
  confirmText = 'Entendido',
}) => {
  const getIconConfig = () => {
    switch (type) {
      case 'error':
        return { name: 'error-outline', color: colors.danger, bgColor: 'rgba(239, 68, 68, 0.1)' };
      case 'success':
        return { name: 'check-circle-outline', color: colors.success, bgColor: 'rgba(16, 185, 129, 0.1)' };
      case 'warning':
        return { name: 'warning-amber', color: colors.warning, bgColor: 'rgba(245, 158, 11, 0.1)' };
      case 'info':
        return { name: 'info-outline', color: colors.primary, bgColor: 'rgba(65, 150, 227, 0.1)' };
      default:
        return { name: 'info-outline', color: colors.primary, bgColor: 'rgba(65, 150, 227, 0.1)' };
    }
  };

  const iconConfig = getIconConfig();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          {/* Icon */}
          <View style={[styles.iconContainer, { backgroundColor: iconConfig.bgColor }]}>
            <MaterialIcons name={iconConfig.name} size={48} color={iconConfig.color} />
          </View>

          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Message */}
          <Text style={styles.message}>{message}</Text>

          {/* Button */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: iconConfig.color }]}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  alertContainer: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: colors.textGray,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomAlert;
