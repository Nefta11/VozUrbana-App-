import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../utils/colors';
import CustomHeader from '../../Components/navigation/CustomHeader';
import ProgressSteps from '../../Components/CreateReport/ProgressSteps';
import FormInput from '../../Components/CreateReport/FormInput';
import CategorySelector from '../../Components/CreateReport/CategorySelector';
import PrioritySelector from '../../Components/CreateReport/PrioritySelector';
import MapSelector from '../../Components/CreateReport/MapSelector';
import ReviewSection from '../../Components/CreateReport/ReviewSection';
import LeafletMap from '../../Components/MapView/LeafletMap';
import CustomAlert from '../../Components/generals/CustomAlert';

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

  // Estados de errores
  const [errors, setErrors] = useState({});

  // Estado del alert personalizado
  const [alert, setAlert] = useState({
    visible: false,
    title: '',
    message: '',
    type: 'error',
  });

  const steps = ['Información', 'Categoria', 'Ubicación', 'Revisar'];

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
      descripcion: 'Problemas de construcción',
      fallbackIcon: 'construction',
      fallbackType: 'MaterialIcons',
      color: colors.categoryOrange,
    },
    {
      id: 3,
      nombre: 'Salud Publica',
      descripcion: 'Problemas de salud pública',
      fallbackIcon: 'medical-services',
      fallbackType: 'MaterialIcons',
      color: colors.categoryRed,
    },
    {
      id: 4,
      nombre: 'Seguridad',
      descripcion: 'Problemas de seguridad',
      fallbackIcon: 'shield-checkmark',
      fallbackType: 'Ionicons',
      color: colors.categoryPurple,
    },
    {
      id: 5,
      nombre: 'Medio Ambiente',
      descripcion: 'Problemas ambientales',
      fallbackIcon: 'leaf',
      fallbackType: 'Ionicons',
      color: colors.categoryGreen,
    },
    {
      id: 6,
      nombre: 'Servicios Publicos',
      descripcion: 'Problemas de servicios públicos',
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

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!titulo.trim()) {
        newErrors.titulo = 'El título es obligatorio';
      }
      if (!descripcion.trim()) {
        newErrors.descripcion = 'La descripción es obligatoria';
      }
    } else if (step === 2) {
      if (!categoria) {
        newErrors.categoria = 'Por favor selecciona una categoría';
      }
    } else if (step === 3) {
      if (!coordenadas.trim()) {
        newErrors.coordenadas = 'Por favor selecciona una ubicación en el mapa';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    const isValid = validateStep(currentStep);

    if (!isValid) {
      // Mostrar alert personalizado cuando hay errores
      setAlert({
        visible: true,
        title: 'Campos incompletos',
        message: 'Por favor completa todos los campos obligatorios antes de continuar',
        type: 'warning',
      });
      return;
    }

    // Limpiar errores si todo está bien
    setErrors({});

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Limpiar errores al retroceder
      setErrors({});
    }
  };

  const handleSelectCategory = (cat) => {
    setCategoria(cat.id);
    setSelectedCategoryData(cat);
    // Limpiar error de categoría al seleccionar
    if (errors.categoria) {
      setErrors({ ...errors, categoria: null });
    }
  };

  const handleLocationSelect = (lat, lng) => {
    setCoordenadas(`${lat}, ${lng}`);
    // Opcional: aquí podrías hacer una llamada a una API de geocoding inverso
    // para obtener la dirección legible a partir de las coordenadas
    setUbicacion(`Lat: ${lat}, Lng: ${lng}`);
    // Limpiar error de coordenadas al seleccionar ubicación
    if (errors.coordenadas) {
      setErrors({ ...errors, coordenadas: null });
    }
  };

  const handleImageSelect = async () => {
    try {
      // Pedir permisos para acceder a la galería
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Error', 'Se requiere permiso para acceder a la galería de fotos');
        return;
      }

      // Abrir selector de imagen
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setImagen(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar la imagen');
    }
  };

  const handleSubmit = () => {
    if (currentStep === 4) {
      // Validar todos los pasos antes de enviar
      const allValid = validateStep(1) && validateStep(2) && validateStep(3);

      if (!allValid) {
        setAlert({
          visible: true,
          title: 'Campos incompletos',
          message: 'Por favor revisa que todos los campos obligatorios estén completos',
          type: 'error',
        });
        return;
      }

      console.log('Enviando reporte:', {
        titulo,
        descripcion,
        categoria,
        prioridad,
        ubicacion,
        coordenadas,
        imagen,
      });

      setAlert({
        visible: true,
        title: 'Reporte Enviado',
        message: 'Tu reporte ha sido enviado satisfactoriamente, en breve recibirás respuesta',
        type: 'success',
      });
    }
  };

  const handleCloseAlert = () => {
    const wasSuccess = alert.type === 'success' && alert.visible;
    setAlert({ ...alert, visible: false });

    // Si era un alert de éxito, navegar al Home
    if (wasSuccess) {
      navigation.navigate('Home');
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

      <FormInput
        label="Titulo*"
        placeholder="Ej. Fuga de agua en Av. Principal"
        value={titulo}
        onChangeText={(text) => {
          setTitulo(text);
          // Limpiar error al escribir
          if (errors.titulo) {
            setErrors({ ...errors, titulo: null });
          }
        }}
        error={errors.titulo}
      />

      <FormInput
        label="Descripción*"
        placeholder="Describe detalladamente el problema..."
        value={descripcion}
        onChangeText={(text) => {
          setDescripcion(text);
          // Limpiar error al escribir
          if (errors.descripcion) {
            setErrors({ ...errors, descripcion: null });
          }
        }}
        multiline
        numberOfLines={6}
        error={errors.descripcion}
      />
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Categoria y Prioridad</Text>
      <Text style={styles.stepDescription}>
        Clasifica el tipo de problema y su nivel de urgencia
      </Text>

      <CategorySelector
        categories={categories}
        selectedCategory={categoria}
        onSelectCategory={handleSelectCategory}
        error={errors.categoria}
      />

      <PrioritySelector
        priorities={priorities}
        selectedPriority={prioridad}
        onSelectPriority={setPrioridad}
      />
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Ubicación</Text>
      <Text style={styles.stepDescription}>
        Indica dónde se encuentra el problema
      </Text>

      {/* Campo de coordenadas */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Dirección*</Text>
        <TextInput
          style={[
            styles.input,
            errors.coordenadas && styles.inputError
          ]}
          placeholder="20.274500, -97.955700"
          placeholderTextColor={colors.textPlaceholder}
          value={coordenadas}
          onChangeText={setCoordenadas}
          editable={false}
        />
        {errors.coordenadas && (
          <View style={styles.errorContainer}>
            <MaterialIcons name="error-outline" size={16} color={colors.danger} />
            <Text style={styles.errorText}>{errors.coordenadas}</Text>
          </View>
        )}
      </View>

      <Text style={styles.mapLabel}>Selecciona en el mapa</Text>
      <Text style={styles.mapInstructions}>
        Toca en cualquier punto del mapa para marcar la ubicación del problema
      </Text>

      {/* Mapa real integrado */}
      <View style={styles.mapContainer}>
        <LeafletMap
          selectable={true}
          onLocationSelect={handleLocationSelect}
        />
      </View>

      {/* Sección de carga de imagen */}
      <View style={styles.uploadSection}>
        <TouchableOpacity style={styles.uploadImageButton} onPress={handleImageSelect}>
          <MaterialIcons name="file-upload" size={24} color={colors.primary} />
          <Text style={styles.uploadImageText}>Subir imagen</Text>
        </TouchableOpacity>
        <Text style={styles.uploadImageSubtext}>PNG, JPG, GIF, hasta 5MB</Text>
        
        {/* Vista previa de imagen */}
        {imagen && (
          <View style={styles.imagePreview}>
            <Image source={{ uri: imagen }} style={styles.previewImage} />
            <TouchableOpacity 
              style={styles.removeImageButton}
              onPress={() => setImagen(null)}
            >
              <MaterialIcons name="close" size={20} color={colors.textWhite} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Revisar y Enviar</Text>
      <Text style={styles.stepDescription}>
        Verifica la información antes de enviar el reporte
      </Text>

      <ReviewSection
        titulo={titulo}
        descripcion={descripcion}
        categoria={categoria}
        categoryData={selectedCategoryData}
        prioridad={prioridad}
        priorities={priorities}
        ubicacion={ubicacion}
        coordenadas={coordenadas}
        imagen={imagen}
      />
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
        {/* Main Card Container */}
        <View style={styles.mainCard}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Crear Nuevo Reporte</Text>
            <Text style={styles.headerSubtitle}>
              Contribuye a mejorar tu comunidad reportando problemas
            </Text>
          </View>

          {/* Progress Steps */}
          <ProgressSteps currentStep={currentStep} steps={steps} />

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
              style={[
                styles.nextButton,
                currentStep === 1 && styles.nextButtonFull,
                currentStep === 4 && styles.submitButton
              ]}
              onPress={currentStep === 4 ? handleSubmit : handleNext}
            >
              <Text style={styles.nextButtonText}>
                {currentStep === 4 ? 'Enviar reporte' : 'Siguiente'}
              </Text>
              <MaterialIcons
                name={currentStep === 4 ? 'send' : 'chevron-right'}
                size={20}
                color={colors.textWhite}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Custom Alert */}
      <CustomAlert
        visible={alert.visible}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        onClose={handleCloseAlert}
        confirmText={alert.type === 'success' ? 'Aceptar' : 'Entendido'}
      />
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
    padding: 16,
    paddingBottom: 30,
  },
  mainCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
    alignItems: 'center',
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
    flex: 1,
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
  submitButton: {
    backgroundColor: '#10b981',
  },
  nextButtonText: {
    color: colors.textWhite,
    fontSize: 16,
    fontWeight: '600',
  },
  // Estilos para Step 3
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
  inputError: {
    borderColor: colors.danger,
    borderWidth: 1.5,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },
  errorText: {
    fontSize: 14,
    color: colors.danger,
    flex: 1,
  },
  mapLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 8,
  },
  mapInstructions: {
    fontSize: 14,
    color: colors.textGray,
    marginBottom: 16,
    lineHeight: 20,
  },
  mapContainer: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
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
    marginBottom: 8,
  },
  uploadImageText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  uploadImageSubtext: {
    fontSize: 12,
    color: colors.textGray,
    marginBottom: 16,
  },
  imagePreview: {
    position: 'relative',
    width: '100%',
    marginTop: 16,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.danger,
    borderRadius: 20,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

});
