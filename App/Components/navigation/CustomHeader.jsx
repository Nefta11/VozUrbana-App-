import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Image } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';

/**
 * CustomHeader - Barra superior personalizada para la aplicación
 * Incluye el logo de "mi voz urbana" y botones de información y notificaciones
 */
const CustomHeader = ({ 
  title = "mi voz", 
  subtitle = "urbana",
  showNotifications = true, 
  showInfo = true,
  onInfoPress,
  onNotificationPress 
}) => {
  
  const handleInfoPress = () => {
    if (onInfoPress) {
      onInfoPress();
    }
  };

  const handleNotificationPress = () => {
    if (onNotificationPress) {
      onNotificationPress();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.headerBackground} />
      <View style={styles.container}>
        
        {/* Logo y título */}
        <View style={styles.leftSection}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../../assets/White.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <View style={styles.titleContainer}>
              <Text style={styles.logoText}>{title}</Text>
              <Text style={styles.subtitleText}>{subtitle}</Text>
            </View>
          </View>
        </View>

        {/* Botones del lado derecho */}
        <View style={styles.rightSection}>
          {showInfo && (
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={handleInfoPress}
              activeOpacity={0.7}
            >
              <Ionicons name="information-circle-outline" size={24} color={colors.textWhite} />
            </TouchableOpacity>
          )}
          
          {showNotifications && (
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={handleNotificationPress}
              activeOpacity={0.7}
            >
              <Ionicons name="notifications-outline" size={24} color={colors.textWhite} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.headerBackground || colors.primary,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.headerBackground || colors.primary,
    minHeight: 60,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoImage: {
    width: 32,
    height: 32,
  },
  titleContainer: {
    flexDirection: 'column',
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textWhite,
    letterSpacing: 0.3,
    lineHeight: 20,
  },
  subtitleText: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textWhite,
    letterSpacing: 0.3,
    lineHeight: 16,
    marginTop: -2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export default CustomHeader;