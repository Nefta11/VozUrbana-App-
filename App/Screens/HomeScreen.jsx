import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5
} from '@expo/vector-icons';
import { colors, gradients } from '../utils/colors';
import Constants from 'expo-constants';
import CustomHeader from '../Components/navigation/CustomHeader';
import LeafletMap from '../Components/MapView/LeafletMap';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    inProcess: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Simular carga de datos
  useEffect(() => {
    // Aquí irá la lógica para cargar los reportes reales
    setTimeout(() => {
      setStats({
        total: 150,
        resolved: 45,
        inProcess: 80,
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const categories = [
    {
      id: 1,
      nombre: 'Saneamiento',
      title: 'Saneamiento',
      descripcion: 'Agua potable, drenaje y alcantarillado',
      fallbackIcon: 'water',
      fallbackType: 'Ionicons',
      color: colors.categoryBlue,
      count: 15,
    },
    {
      id: 2,
      nombre: 'Infraestructura',
      title: 'Infraestructura',
      descripcion: 'Calles, banquetas y vialidades',
      fallbackIcon: 'construction',
      fallbackType: 'MaterialIcons',
      color: colors.categoryOrange,
      count: 23,
    },
    {
      id: 3,
      nombre: 'Seguridad Pública',
      title: 'Seguridad Pública',
      descripcion: 'Servicios médicos y sanitarios',
      fallbackIcon: 'medical-services',
      fallbackType: 'MaterialIcons',
      color: colors.categoryRed,
      count: 8,
    },
    {
      id: 4,
      nombre: 'Seguridad',
      title: 'Seguridad',
      descripcion: 'Iluminación y vigilancia',
      fallbackIcon: 'shield-checkmark',
      fallbackType: 'Ionicons',
      color: colors.categoryPurple,
      count: 12,
    },
    {
      id: 5,
      nombre: 'Medio Ambiente',
      title: 'Medio Ambiente',
      descripcion: 'Áreas verdes y reciclaje',
      fallbackIcon: 'leaf',
      fallbackType: 'Ionicons',
      color: colors.categoryGreen,
      count: 19,
    },
    {
      id: 6,
      nombre: 'Servicios Públicos',
      title: 'Servicios Públicos',
      descripcion: 'Electricidad y alumbrado',
      fallbackIcon: 'flash',
      fallbackType: 'Ionicons',
      color: colors.categoryCyan,
      count: 7,
    },
  ];

  const renderCategoryIcon = (category, size = 24) => {
    // Usar color azul para todos los iconos
    return renderFallbackIcon(category.fallbackIcon, category.fallbackType, size, '#465eef');
  };

  const renderFallbackIcon = (iconName, iconType, size, color) => {
    switch (iconType) {
      case 'MaterialIcons':
        return <MaterialIcons name={iconName} size={size} color={color} />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      case 'Ionicons':
        return <Ionicons name={iconName} size={size} color={color} />;
      case 'FontAwesome5':
        return <FontAwesome5 name={iconName} size={size} color={color} />;
      default:
        return <MaterialIcons name="info" size={size} color={color} />;
    }
  };

  const handleCreateReport = () => {
    // Navegar a la pantalla de crear reporte
    navigation.navigate('CreateReport');
  };

  const handleViewReports = () => {
    // Navegar a la pantalla de ver reportes
    navigation.navigate('Reports');
  };

  const handleCategoryPress = (category) => {
    // Navegar a reportes filtrados por categoría
    navigation.navigate('Reports', { category: category.nombre });
  };

  const handleInfoPress = () => {
    Alert.alert('Información', 'Voz Urbana - Tu plataforma ciudadana para reportar problemas en tu comunidad');
  };

  const handleNotificationPress = () => {
    Alert.alert('Notificaciones', 'No tienes notificaciones nuevas');
  };

  return (
    <View style={styles.container}>
      {/* Header personalizado */}
      <CustomHeader 
        onInfoPress={handleInfoPress}
        onNotificationPress={handleNotificationPress}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroSection}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Voz Urbana</Text>
            <Text style={styles.heroSubtitle}>
              Plataforma ciudadana para reportar problemas de salud pública e
              infraestructura en tu comunidad
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleCreateReport}
            >
              <Text style={styles.primaryButtonText}>Crear Reporte</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <MaterialIcons name="description" size={40} color={colors.primary} />
            <View style={styles.statInfo}>
              <Text style={styles.statNumber}>{stats.total}</Text>
              <Text style={styles.statLabel}>Total reportes</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <MaterialIcons name="schedule" size={40} color={colors.warning} />
            <View style={styles.statInfo}>
              <Text style={styles.statNumber}>{stats.inProcess}</Text>
              <Text style={styles.statLabel}>En Proceso</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <MaterialIcons name="check-circle" size={40} color={colors.success} />
            <View style={styles.statInfo}>
              <Text style={styles.statNumber}>{stats.resolved}</Text>
              <Text style={styles.statLabel}>Resueltos</Text>
            </View>
          </View>
        </View>

        {/* Mapa de Reportes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mapa de Reportes</Text>
          <LeafletMap />
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categorías de Reportes</Text>
            <Text style={styles.sectionSubtitle}>
              Selecciona la categoría para ver reportes específicos
            </Text>
          </View>

          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.newCategoryCard}
                onPress={() => handleCategoryPress(category)}
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



        {/* Espaciado inferior */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  scrollView: {
    flex: 1,
  },

  // Hero Section
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    paddingTop: 20,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.textWhite,
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    color: colors.textWhite,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    opacity: 0.9,
    paddingHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: colors.textWhite,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },

  // Stats Section
  statsSection: {
    paddingHorizontal: 20,
    paddingVertical: 0,
    marginTop: -20,
    gap: 12,
  },
  statCard: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statInfo: {
    marginLeft: 20,
    flex: 1,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textGray,
    fontWeight: '500',
  },

  // Section Common Styles
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textGray,
    lineHeight: 20,
  },

  // Categories Section
  categoriesGrid: {
    gap: 8,
  },
  newCategoryCard: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  newCategoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  newCategoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 4,
  },
  newCategoryDescription: {
    fontSize: 13,
    color: colors.textGray,
    lineHeight: 18,
  },
  
  // Estilos antiguos de categorías (mantener por compatibilidad)
  categoryCard: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  categoryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  categoryContent: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 13,
    color: colors.textGray,
    lineHeight: 18,
  },



  // Bottom Spacing
  bottomSpacing: {
    height: 30,
  },

  // Loading
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});
