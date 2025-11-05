import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';

const { width } = Dimensions.get('window');

/**
 * BottomTabBar - Barra de navegación inferior estilo Spotify
 * Componente personalizado que replica el estilo de navegación de Spotify
 */
const BottomTabBar = ({ state, descriptors, navigation }) => {
  
  // Configuración de los tabs con iconos y labels
  const tabConfig = {
    Home: {
      icon: 'home-outline',
      iconType: 'Ionicons',
      label: 'Inicio',
      activeIcon: 'home',
    },
    Reports: {
      icon: 'megaphone-outline',
      iconType: 'Ionicons',
      label: 'Reportes',
      activeIcon: 'megaphone',
    },
    CreateReport: {
      icon: 'add-circle-outline',
      iconType: 'Ionicons',
      label: 'Crear',
      activeIcon: 'add-circle',
    },
    Profile: {
      icon: 'person-outline',
      iconType: 'Ionicons',
      label: 'Perfil',
      activeIcon: 'person',
    },
  };

  const renderIcon = (iconName, iconType, size, color) => {
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
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const config = tabConfig[route.name];

          if (!config) return null;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // Estilo especial para el botón de crear
          if (route.name === 'CreateReport') {
            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.createButton}
                activeOpacity={0.7}
              >
                <View style={styles.createButtonBackground}>
                  {renderIcon(
                    isFocused ? config.activeIcon : config.icon,
                    config.iconType,
                    30,
                    colors.textWhite
                  )}
                </View>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tab}
              activeOpacity={0.8}
            >
              <View style={styles.tabContent}>
                {renderIcon(
                  isFocused ? config.activeIcon : config.icon,
                  config.iconType,
                  26,
                  isFocused ? colors.primary : colors.textGray
                )}
                <Text 
                  style={[
                    styles.tabLabel,
                    { color: isFocused ? colors.primary : colors.textGray }
                  ]}
                >
                  {config.label}
                </Text>
                {isFocused && <View style={styles.activeIndicator} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundWhite,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingBottom: 20, // Espacio para dispositivos con home indicator
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 20,
    minHeight: 70,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  tabContent: {
    alignItems: 'center',
    position: 'relative',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
    textAlign: 'center',
  },
  activeIndicator: {
    position: 'absolute',
    top: -6,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.primary,
  },
  
  // Botón especial de crear
  createButton: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  createButtonBackground: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default BottomTabBar;