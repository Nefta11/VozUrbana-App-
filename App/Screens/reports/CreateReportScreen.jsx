import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import CustomHeader from '../../Components/navigation/CustomHeader';
import * as ImagePicker from 'expo-image-picker';

export default function CreateReportScreen({ navigation }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState(null);
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);
  const [prioridad, setPrioridad] = useState('media');
  const [ubicacion, setUbicacion] = useState('');
  const [coordenadas, setCoordenadas] = useState('');
  const [imagen, setImagen] = useState(null);

  const categories = [
    {
      id: 1,
      nombre: 'Saneamiento',
      descripcion: 'Problemas de agua y draje',
      fallbackIcon: 'water',
      fallbackType: 'Ionicons',
      color: colors.categoryBlue,
    },
    {
      id: 2,
      nombre: 'Infraestructura',
      descripcion: 'Problemas de agua y draje',
      fallbackIcon: 'construction',
      fallbackType: 'MaterialIcons',
      color: colors.categoryOrange,
    },
    {
      id: 3,
      nombre: 'Salud Publica',
      descripcion: 'Problemas de agua y draje',
      fallbackIcon: 'medical-services',
      fallbackType: 'MaterialIcons',
      color: colors.categoryRed,
    },
    {
      id: 4,
      nombre: 'Seguridad',
      descripcion: 'Problemas de agua y draje',
      fallbackIcon: 'shield-checkmark',
      fallbackType: 'Ionicons',
      color: colors.categoryPurple,
    },
    {
      id: 5,
      nombre: 'Medio Ambiente',
      descripcion: 'Problemas de agua y draje',
      fallbackIcon: 'leaf',
      fallbackType: 'Ionicons',
      color: colors.categoryGreen,
    },
    {
      id: 6,
      nombre: 'Servicios Publicos',
      descripcion: 'Problemas de agua y draje',
      fallbackIcon: 'flash',
      fallbackType: 'Ionicons',
      color: colors.categoryCyan,
    },
  ];

  const priorities = [
    { value: 'baja', label: 'Baja', color: colors.success },
    { value: 'media', label: 'Media', color: colors.warning },
    { value: 'alta', label: 'Alta', color: colors.danger },
  ];

  const renderCategoryIcon = (category, size = 24) => {
    return renderFallbackIcon(category.fallbackIcon, category.fallbackType, size, category.color);
  };

  const renderFallbackIcon = (iconName, iconType, size, color) => {
    switch (iconType) {
      case 'MaterialIcons':
        return <MaterialIcons name={iconName} size={size} color={color} />;
      case 'Ionicons':
        return <Ionicons name={iconName} size={size} color={color} />;
      default:
        return <MaterialIcons name="info" size={size} color={color} />;
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!titulo.trim() || !descripcion.trim()) {
        Alert.alert('Error', 'Por favor completa todos los campos');
        return;
      }
    } else if (currentStep === 2) {
      if (!categoria) {
        Alert.alert('Error', 'Por favor selecciona una categoría');
        return;
      }
    } else if (currentStep === 3) {
      if (!coordenadas.trim()) {
        Alert.alert('Error', 'Por favor selecciona una ubicación en el mapa');
        return;
      }
    }
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos', 'Se necesitan permisos para acceder a las fotos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  const handleMapSelect = () => {
    setCoordenadas('20.274500, -97.955700');
    setUbicacion('Loma Chica, Colonia Agustín Olvera, Acatlán, Hidalgo, 43703, México');
  };

  const handleSubmit = () => {
    if (currentStep === 4) {
      // Validaciones finales
      if (!titulo.trim()) {
        Alert.alert('Error', 'Por favor ingresa un título');
        return;
      }
      if (!descripcion.trim()) {
        Alert.alert('Error', 'Por favor ingresa una descripción');
        return;
      }
      if (!categoria) {
        Alert.alert('Error', 'Por favor selecciona una categoría');
        return;
      }

      // TODO: Enviar al backend
      console.log('Enviando reporte:', {
        titulo,
        descripcion,
        categoria,
        prioridad,
        ubicacion,
        coordenadas,
        imagen,
      });

      Alert.alert(
        'Éxito',
        'Reporte creado correctamente',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );
    }
  };

  const handleInfoPress = () => {
    Alert.alert('Información', 'Formulario para crear un nuevo reporte ciudadano');
  };

  const handleNotificationPress = () => {
    Alert.alert('Notificaciones', 'No tienes notificaciones nuevas');
  };



  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Información Básica</Text>
      <Text style={styles.stepDescription}>
        Proporciona los detalles principales del problema
      </Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Titulo*</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Fuga de agua en Av. Principal"
          placeholderTextColor={colors.textPlaceholder}
          value={titulo}
          onChangeText={setTitulo}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Descripción*</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe detalladamente el problema..."
          placeholderTextColor={colors.textPlaceholder}
          value={descripcion}
          onChangeText={setDescripcion}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Categoria y Prioridad</Text>
      <Text style={styles.stepDescription}>
        Clasifica el tipo de problema y su nivel de urgencia
      </Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Categoria*</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                categoria === cat.id && styles.categoryCardActive,
              ]}
              onPress={() => {
                setCategoria(cat.id);
                setSelectedCategoryData(cat);
              }}
              activeOpacity={0.7}
            >
              <View style={styles.categoryIconContainer}>
                {renderCategoryIcon(cat, 24)}
              </View>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{cat.nombre}</Text>
                <Text style={styles.categoryDescription}>{cat.descripcion}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={colors.textGray} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.prioritySection}>
        {priorities.map((p) => (
          <TouchableOpacity
            key={p.value}
            style={[
              styles.priorityCard,
              prioridad === p.value && styles.priorityCardActive,
            ]}
            onPress={() => setPrioridad(p.value)}
          >
            <View style={[styles.priorityDot, { backgroundColor: p.color }]} />
            <Text style={[styles.priorityLabel, prioridad === p.value && { color: p.color }]}>
              {p.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Ubicación</Text>
      <Text style={styles.stepDescription}>
        Indica dónde se encuentra el problema
      </Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Dirección*</Text>
        <TextInput
          style={styles.input}
          placeholder="20.274500, -97.955700"
          placeholderTextColor={colors.textPlaceholder}
          value={coordenadas}
          onChangeText={setCoordenadas}
          editable={false}
        />
      </View>

      <Text style={styles.mapLabel}>Selecciona en el mapa</Text>
      
      <TouchableOpacity 
        style={styles.mapButton}
        onPress={handleMapSelect}
      >
        <MaterialIcons name="location-pin" size={20} color={colors.textWhite} />
        <Text style={styles.mapButtonText}>Haz clic en el mapa para seleccio...</Text>
      </TouchableOpacity>

      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <MaterialIcons name="map" size={64} color={colors.borderLight} />
          <Text style={styles.mapPlaceholderText}>Vista del mapa</Text>
          <TouchableOpacity 
            style={styles.mapSelectButton}
            onPress={handleMapSelect}
          >
            <MaterialIcons name="add" size={24} color={colors.textWhite} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapZoomIn}>
            <MaterialIcons name="add" size={20} color={colors.textDark} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapZoomOut}>
            <MaterialIcons name="remove" size={20} color={colors.textDark} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.uploadSection}>
        <TouchableOpacity style={styles.uploadImageButton} onPress={handleSelectImage}>
          <MaterialIcons name="file-upload" size={24} color={colors.primary} />
          <Text style={styles.uploadImageText}>Subir imagen</Text>
        </TouchableOpacity>
        <Text style={styles.uploadImageSubtext}>PNG, GIF, WEBP, hasta 5MB</Text>
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Revisar y Enviar</Text>
      <Text style={styles.stepDescription}>
        Verifica la información antes de enviar el reporte
      </Text>

      <View style={styles.reviewSection}>
        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Información Básica</Text>
          <Text style={styles.reviewValue}>Título: {titulo || 'Sin título'}</Text>
          <Text style={styles.reviewValue}>Descripción: {descripcion || 'Sin descripción'}</Text>
        </View>

        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Categoria y Prioridad</Text>
          <Text style={styles.reviewValue}>
            Categoria: {selectedCategoryData?.nombre || categories.find(c => c.id === categoria)?.nombre || 'Sin categoría'}
          </Text>
          <Text style={styles.reviewValue}>
            Prioridad: {priorities.find(p => p.value === prioridad)?.label || 'Sin prioridad'}
          </Text>
        </View>

        <View style={styles.reviewItem}>
          <Text style={styles.reviewLabel}>Ubicación</Text>
          <Text style={styles.reviewValue}>
            Dirección: {ubicacion || 'Sin ubicación'}
          </Text>
          <Text style={styles.reviewValue}>
            Coordenadas: {coordenadas || 'Sin coordenadas'}
          </Text>
        </View>

        {imagen && (
          <View style={styles.reviewItem}>
            <Text style={styles.reviewLabel}>Imagen adjunta</Text>
            <Image source={{ uri: imagen }} style={styles.reviewImage} />
            <Text style={styles.reviewImageInfo}>
              Imagen seleccionada correctamente
            </Text>
          </View>
        )}
      </View>
    </View>
  );

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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Crear Nuevo Reporte</Text>
          <Text style={styles.headerSubtitle}>
            Contribuye a mejorar tu comunidad reportando problemas
          </Text>
        </View>

        {/* Progress Steps */}
        <View style={styles.progressContainer}>
          {[1, 2, 3, 4].map((step) => (
            <View key={step} style={styles.stepIndicator}>
              <View style={[
                styles.stepCircle,
                step <= currentStep && styles.stepCircleActive
              ]}>
                <Text style={[
                  styles.stepNumber,
                  step <= currentStep && styles.stepNumberActive
                ]}>
                  {step}
                </Text>
              </View>
              <Text style={[
                styles.stepLabel,
                step <= currentStep && styles.stepLabelActive
              ]}>
                {step === 1 && 'Información'}
                {step === 2 && 'Categoria'}
                {step === 3 && 'Ubicación'}
                {step === 4 && 'Revisar'}
              </Text>
              {step < 4 && (
                <View style={[
                  styles.stepConnector,
                  step < currentStep && styles.stepConnectorActive
                ]} />
              )}
            </View>
          ))}
        </View>

        {/* Step Content */}
        {renderStep()}

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          {currentStep > 1 && (
            <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
              <MaterialIcons name="chevron-left" size={20} color={colors.textGray} />
              <Text style={styles.previousButtonText}>Anterior</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={[styles.nextButton, currentStep === 1 && styles.nextButtonFull]}
            onPress={currentStep === 4 ? handleSubmit : handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentStep === 4 ? 'Enviar reporte' : 'Siguiente'}
            </Text>
            <MaterialIcons name="chevron-right" size={20} color={colors.textWhite} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundMain,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textGray,
    textAlign: 'center',
    lineHeight: 22,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: colors.backgroundLight,
  },
  stepIndicator: {
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  stepCircleActive: {
    backgroundColor: colors.primary,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textGray,
  },
  stepNumberActive: {
    color: colors.textWhite,
  },
  stepLabel: {
    fontSize: 12,
    color: colors.textGray,
    textAlign: 'center',
  },
  stepLabelActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  stepConnector: {
    position: 'absolute',
    top: 16,
    left: '50%',
    right: '-50%',
    height: 2,
    backgroundColor: colors.borderLight,
    zIndex: -1,
  },
  stepConnectorActive: {
    backgroundColor: colors.primary,
  },
  stepContainer: {
    padding: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: colors.textGray,
    marginBottom: 24,
    lineHeight: 22,
  },
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
  categoriesGrid: {
    gap: 12,
  },
  categoryCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderLight,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 8,
  },
  categoryCardActive: {
    backgroundColor: colors.primary + '10',
    borderColor: colors.primary,
  },
  categoryIconContainer: {
    marginRight: 12,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 2,
  },
  categoryDescription: {
    fontSize: 14,
    color: colors.textGray,
  },
  prioritySection: {
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
  mapLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 12,
  },
  mapButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  mapButtonText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '500',
  },
  mapContainer: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    position: 'relative',
  },
  mapPlaceholderText: {
    fontSize: 16,
    color: colors.textGray,
    marginTop: 8,
  },
  mapSelectButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: colors.primary,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapZoomIn: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: colors.backgroundLight,
    width: 36,
    height: 36,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  mapZoomOut: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: colors.backgroundLight,
    width: 36,
    height: 36,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  uploadSection: {
    alignItems: 'center',
  },
  uploadImageButton: {
    backgroundColor: colors.primary + '10',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  uploadImageText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  uploadImageSubtext: {
    fontSize: 12,
    color: colors.textGray,
    marginTop: 4,
  },
  reviewSection: {
    gap: 20,
  },
  reviewItem: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  reviewLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 8,
  },
  reviewValue: {
    fontSize: 14,
    color: colors.textGray,
    marginBottom: 4,
  },
  reviewImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  reviewImageInfo: {
    fontSize: 12,
    color: colors.textGray,
    fontStyle: 'italic',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  previousButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.backgroundLight,
    gap: 4,
  },
  previousButtonText: {
    fontSize: 16,
    color: colors.textGray,
    fontWeight: '500',
  },
  nextButton: {
    flex: 2,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 4,
  },
  nextButtonFull: {
    flex: 1,
  },
  nextButtonText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '600',
  },
});
