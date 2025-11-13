import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import CustomHeader from '../../Components/navigation/CustomHeader';
import ProgressSteps from '../../Components/CreateReport/ProgressSteps';
import FormInput from '../../Components/CreateReport/FormInput';
import CategorySelector from '../../Components/CreateReport/CategorySelector';
import PrioritySelector from '../../Components/CreateReport/PrioritySelector';
import MapSelector from '../../Components/CreateReport/MapSelector';
import ReviewSection from '../../Components/CreateReport/ReviewSection';

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

  const handleSelectCategory = (cat) => {
    setCategoria(cat.id);
    setSelectedCategoryData(cat);
  };

  const handleMapSelect = () => {
    setCoordenadas('20.274500, -97.955700');
    setUbicacion('Loma Chica, Colonia Agustín Olvera, Acatlán, Hidalgo, 43703, México');
  };

  const handleImageSelect = (uri) => {
    setImagen(uri);
  };

  const handleSubmit = () => {
    if (currentStep === 4) {
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

      <FormInput
        label="Titulo*"
        placeholder="Ej. Fuga de agua en Av. Principal"
        value={titulo}
        onChangeText={setTitulo}
      />

      <FormInput
        label="Descripción*"
        placeholder="Describe detalladamente el problema..."
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        numberOfLines={6}
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

      <MapSelector
        coordenadas={coordenadas}
        onMapSelect={handleMapSelect}
        onImageSelect={handleImageSelect}
      />
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
