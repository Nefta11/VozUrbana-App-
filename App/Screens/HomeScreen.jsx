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
      descripcion: 'Agua potable, drenaje y alcantarillado',
      icono: 'water',
      iconType: 'Ionicons',
      color: colors.categoryBlue,
    },
    {
      id: 2,
      nombre: 'Infraestructura',
      descripcion: 'Calles, banquetas y vialidades',
      icono: 'road-variant',
      iconType: 'MaterialCommunityIcons',
      color: colors.categoryOrange,
    },
    {
      id: 3,
      nombre: 'Salud Pública',
      descripcion: 'Servicios médicos y sanitarios',
      icono: 'medical-services',
      iconType: 'MaterialIcons',
      color: colors.categoryRed,
    },
    {
      id: 4,
      nombre: 'Seguridad',
      descripcion: 'Iluminación y vigilancia',
      icono: 'shield-checkmark',
      iconType: 'Ionicons',
      color: colors.categoryPurple,
    },
    {
      id: 5,
      nombre: 'Medio Ambiente',
      descripcion: 'Áreas verdes y reciclaje',
      icono: 'leaf',
      iconType: 'Ionicons',
      color: colors.categoryGreen,
    },
    {
      id: 6,
      nombre: 'Servicios Públicos',
      descripcion: 'Electricidad y alumbrado',
      icono: 'flash',
      iconType: 'Ionicons',
      color: colors.categoryCyan,
    },
    {
      id: 7,
      nombre: 'Transporte',
      descripcion: 'Transporte público y movilidad',
      icono: 'bus',
      iconType: 'Ionicons',
      color: colors.categoryYellow,
    },
    {
      id: 8,
      nombre: 'Residuos',
      descripcion: 'Recolección de basura',
      icono: 'trash-bin',
      iconType: 'Ionicons',
      color: colors.categoryGray,
    },
  ];

  const renderIcon = (iconName, iconType, size, color) => {
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
            <View style={styles.heroButtons}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleCreateReport}
              >
                <MaterialIcons name="add-circle-outline" size={20} color="white" />
                <Text style={styles.primaryButtonText}>Crear Reporte</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleViewReports}
              >
                <MaterialIcons name="list" size={20} color={colors.primary} />
                <Text style={styles.secondaryButtonText}>Ver Reportes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: colors.statTotal }]}>
              <View style={styles.statIconContainer}>
                <MaterialIcons name="description" size={24} color={colors.primary} />
              </View>
              <Text style={styles.statLabel}>Total Reportes</Text>
              <Text style={styles.statNumber}>{stats.total}</Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: colors.statInProcess }]}>
              <View style={styles.statIconContainer}>
                <MaterialIcons name="schedule" size={24} color={colors.warning} />
              </View>
              <Text style={styles.statLabel}>En Proceso</Text>
              <Text style={styles.statNumber}>{stats.inProcess}</Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: colors.statResolved }]}>
              <View style={styles.statIconContainer}>
                <MaterialIcons name="check-circle" size={24} color={colors.success} />
              </View>
              <Text style={styles.statLabel}>Resueltos</Text>
              <Text style={styles.statNumber}>{stats.resolved}</Text>
            </View>
          </View>
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
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(category)}
                activeOpacity={0.7}
              >
                <View style={[styles.categoryIconContainer, { backgroundColor: category.color + '20' }]}>
                  {renderIcon(category.icono, category.iconType, 28, category.color)}
                </View>
                <View style={styles.categoryContent}>
                  <Text style={styles.categoryName}>{category.nombre}</Text>
                  <Text style={styles.categoryDescription}>{category.descripcion}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={20} color={colors.textGray} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* How It Works Section */}
        <View style={[styles.section, styles.howItWorksSection]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Cómo Funciona</Text>
            <Text style={styles.sectionSubtitle}>
              Participa en la mejora de tu comunidad en simples pasos
            </Text>
          </View>

          <View style={styles.stepsContainer}>
            <View style={styles.stepCard}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepTitle}>Crea un Reporte</Text>
              <Text style={styles.stepDescription}>
                Identifica un problema en tu comunidad y créalo usando el formulario
              </Text>
            </View>

            <View style={styles.stepCard}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepTitle}>Geolocaliza el Problema</Text>
              <Text style={styles.stepDescription}>
                Marca la ubicación exacta en el mapa interactivo
              </Text>
            </View>

            <View style={styles.stepCard}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepTitle}>Añade Detalles</Text>
              <Text style={styles.stepDescription}>
                Describe el problema y añade fotos si es posible
              </Text>
            </View>

            <View style={styles.stepCard}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <Text style={styles.stepTitle}>Seguimiento</Text>
              <Text style={styles.stepDescription}>
                Sigue el estado del reporte y recibe actualizaciones
              </Text>
            </View>
          </View>
        </View>

        {/* Call to Action */}
        <LinearGradient
          colors={[colors.secondary, colors.success]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ctaSection}
        >
          <Text style={styles.ctaTitle}>¿Ves un problema en tu comunidad?</Text>
          <Text style={styles.ctaSubtitle}>
            Tu participación es clave para mejorar nuestra ciudad
          </Text>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={handleCreateReport}
          >
            <Text style={styles.ctaButtonText}>Crear un Reporte Ahora</Text>
          </TouchableOpacity>
        </LinearGradient>

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
    paddingTop: 28,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: '800',
    color: colors.textWhite,
    textAlign: 'center',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.textWhite,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    opacity: 0.95,
    paddingHorizontal: 10,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 15,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
    gap: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  primaryButtonText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: colors.textWhite,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 25,
    gap: 8,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },

  // Stats Section
  statsSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  statCard: {
    width: (width - 64) / 3,
    backgroundColor: colors.backgroundLight,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIconContainer: {
    marginBottom: 10,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textGray,
    textAlign: 'center',
    marginBottom: 5,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textDark,
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
    gap: 12,
  },
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

  // How It Works Section
  howItWorksSection: {
    backgroundColor: colors.backgroundLight,
    marginTop: 10,
  },
  stepsContainer: {
    gap: 15,
  },
  stepCard: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stepNumber: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  stepNumberText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textWhite,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 8,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 14,
    color: colors.textGray,
    textAlign: 'center',
    lineHeight: 20,
  },

  // CTA Section
  ctaSection: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textWhite,
    textAlign: 'center',
    marginBottom: 10,
  },
  ctaSubtitle: {
    fontSize: 15,
    color: colors.textWhite,
    textAlign: 'center',
    marginBottom: 25,
    opacity: 0.95,
  },
  ctaButton: {
    backgroundColor: colors.textWhite,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  ctaButtonText: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: '700',
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
