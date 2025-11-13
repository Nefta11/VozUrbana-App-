import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import CustomHeader from '../../Components/navigation/CustomHeader';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState({
    nombre: 'Usuario Demo',
    email: 'usuario@vozurbana.com',
    avatar: null,
    reportesCreados: 5,
    reportesResueltos: 2,
    votos: 45,
  });

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: () => {
            // TODO: Limpiar token/sesión
            navigation.getParent()?.reset({
              index: 0,
              routes: [{ name: 'Landing' }],
            });
          },
        },
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Editar Perfil', 'Funcionalidad en desarrollo');
  };

  const handleChangePassword = () => {
    Alert.alert('Cambiar Contraseña', 'Funcionalidad en desarrollo');
  };

  const handleInfoPress = () => {
    Alert.alert('Información', 'Perfil de usuario y configuraciones de la cuenta');
  };

  const handleNotificationPress = () => {
    Alert.alert('Notificaciones', 'Configurar preferencias de notificaciones');
  };

  const menuItems = [
    {
      id: 1,
      title: 'Mis Reportes',
      icon: 'description',
      iconType: 'MaterialIcons',
      onPress: () => Alert.alert('Mis Reportes', 'Funcionalidad en desarrollo'),
    },
    {
      id: 2,
      title: 'Reportes Guardados',
      icon: 'bookmark',
      iconType: 'MaterialIcons',
      onPress: () => Alert.alert('Guardados', 'Funcionalidad en desarrollo'),
    },
    {
      id: 3,
      title: 'Notificaciones',
      icon: 'notifications',
      iconType: 'MaterialIcons',
      onPress: () => Alert.alert('Notificaciones', 'Funcionalidad en desarrollo'),
    },
    {
      id: 4,
      title: 'Configuración',
      icon: 'settings',
      iconType: 'MaterialIcons',
      onPress: () => Alert.alert('Configuración', 'Funcionalidad en desarrollo'),
    },
    {
      id: 5,
      title: 'Ayuda y Soporte',
      icon: 'help',
      iconType: 'MaterialIcons',
      onPress: () => Alert.alert('Ayuda', 'Funcionalidad en desarrollo'),
    },
    {
      id: 6,
      title: 'Acerca de',
      icon: 'info',
      iconType: 'MaterialIcons',
      onPress: () => Alert.alert('Voz Urbana', 'Versión 1.0.0'),
    },
  ];

  const renderIcon = (iconName, iconType, size, color) => {
    if (iconType === 'MaterialIcons') {
      return <MaterialIcons name={iconName} size={size} color={color} />;
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  };

  return (
    <View style={styles.container}>
      <CustomHeader 
        onInfoPress={handleInfoPress}
        onNotificationPress={handleNotificationPress}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header con gradiente */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            {/* Avatar */}
            <View style={styles.avatarContainer}>
              {user.avatar ? (
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <MaterialIcons name="person" size={48} color={colors.textWhite} />
                </View>
              )}
              <TouchableOpacity
                style={styles.editAvatarButton}
                onPress={handleEditProfile}
              >
                <MaterialIcons name="camera-alt" size={16} color={colors.textWhite} />
              </TouchableOpacity>
            </View>

            {/* Info del usuario */}
            <Text style={styles.userName}>{user.nombre}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>

            {/* Botón editar perfil */}
            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={handleEditProfile}
            >
              <MaterialIcons name="edit" size={18} color={colors.primary} />
              <Text style={styles.editProfileText}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Estadísticas */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <MaterialIcons name="description" size={32} color={colors.primary} />
            <Text style={styles.statNumber}>{user.reportesCreados}</Text>
            <Text style={styles.statLabel}>Reportes Creados</Text>
          </View>

          <View style={styles.statCard}>
            <MaterialIcons name="check-circle" size={32} color={colors.success} />
            <Text style={styles.statNumber}>{user.reportesResueltos}</Text>
            <Text style={styles.statLabel}>Resueltos</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="thumbs-up" size={32} color={colors.warning} />
            <Text style={styles.statNumber}>{user.votos}</Text>
            <Text style={styles.statLabel}>Votos Recibidos</Text>
          </View>
        </View>

        {/* Menú */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuItemIconContainer}>
                  {renderIcon(item.icon, item.iconType, 22, colors.primary)}
                </View>
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={colors.textGray} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Botón de cerrar sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={20} color={colors.danger} />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        {/* Versión */}
        <Text style={styles.versionText}>Voz Urbana v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // Header
  header: {
    backgroundColor: colors.primary,
    paddingTop: 28,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  // Avatar
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.textWhite,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },

  // User Info
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textWhite,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.textWhite,
    opacity: 0.9,
    marginBottom: 16,
  },

  // Edit Profile Button
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.textWhite,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },

  // Stats Section
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textDark,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textGray,
    textAlign: 'center',
    marginTop: 4,
  },

  // Menu Section
  menuSection: {
    backgroundColor: colors.backgroundWhite,
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  menuItemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textDark,
  },

  // Logout Button
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.backgroundWhite,
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.danger + '30',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.danger,
  },

  // Version
  versionText: {
    fontSize: 12,
    color: colors.textGray,
    textAlign: 'center',
    marginTop: 24,
  },
});
