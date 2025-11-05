import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import CustomHeader from '../Components/navigation/CustomHeader';

export default function CreateReportScreen({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoria, setCategoria] = useState(null);
  const [ubicacion, setUbicacion] = useState('');
  const [imagen, setImagen] = useState(null);
  const [prioridad, setPrioridad] = useState('media');

  const categories = [
    { id: 1, nombre: 'Saneamiento', iconImage: require('../../assets/icons/saneamiento.png'), value: 'saneamiento', color: colors.categoryBlue },
    { id: 2, nombre: 'Infraestructura', iconImage: require('../../assets/icons/infraestructura.png'), value: 'infraestructura', color: colors.categoryOrange },
    { id: 3, nombre: 'Seguridad Pública', iconImage: require('../../assets/icons/seguridadPublica.png'), value: 'seguridad_publica', color: colors.categoryRed },
    { id: 4, nombre: 'Seguridad', iconImage: require('../../assets/icons/seguridad.png'), value: 'seguridad', color: colors.categoryPurple },
    { id: 5, nombre: 'Medio Ambiente', iconImage: require('../../assets/icons/medioAmbiente.png'), value: 'medio_ambiente', color: colors.categoryGreen },
    { id: 6, nombre: 'Servicios Públicos', iconImage: require('../../assets/icons/ServiciosPublicos.png'), value: 'servicios_publicos', color: colors.categoryCyan },
  ];

  const priorities = [
    { value: 'baja', label: 'Baja', color: colors.success },
    { value: 'media', label: 'Media', color: colors.warning },
    { value: 'alta', label: 'Alta', color: colors.danger },
  ];

  const handleSelectImage = () => {
    // TODO: Implementar selección de imagen
    Alert.alert('Seleccionar imagen', 'Funcionalidad en desarrollo');
  };

  const handleGetLocation = () => {
    // TODO: Implementar geolocalización
    Alert.alert('Ubicación', 'Funcionalidad de GPS en desarrollo');
    setUbicacion('Av. Juárez #123, Centro');
  };

  const handleSubmit = () => {
    // Validaciones
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
    if (!ubicacion.trim()) {
      Alert.alert('Error', 'Por favor ingresa una ubicación');
      return;
    }

    // TODO: Enviar al backend
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
  };

  const handleInfoPress = () => {
    Alert.alert('Información', 'Formulario para crear un nuevo reporte ciudadano');
  };

  const handleNotificationPress = () => {
    Alert.alert('Notificaciones', 'No tienes notificaciones nuevas');
  };

  const renderCategoryIcon = (iconImage, size = 24, isSelected = false) => {
    return (
      <Image
        source={iconImage}
        style={{
          width: size,
          height: size,
          tintColor: isSelected ? colors.primary : colors.textGray,
        }}
        resizeMode="contain"
      />
    );
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
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Crear Nuevo Reporte</Text>
            <Text style={styles.headerSubtitle}>
              Completa la información del problema que deseas reportar
            </Text>
          </View>

          {/* Título */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Título <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ej: Bache en calle principal"
              placeholderTextColor={colors.textPlaceholder}
              value={titulo}
              onChangeText={setTitulo}
            />
          </View>

          {/* Descripción */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Descripción <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe el problema con detalle..."
              placeholderTextColor={colors.textPlaceholder}
              value={descripcion}
              onChangeText={setDescripcion}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Categoría */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Categoría <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.categoriesGrid}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryCard,
                    categoria === cat.value && styles.categoryCardActive,
                  ]}
                  onPress={() => setCategoria(cat.value)}
                  activeOpacity={0.7}
                >
                  {renderCategoryIcon(
                    cat.iconImage,
                    24,
                    categoria === cat.value
                  )}
                  <Text
                    style={[
                      styles.categoryText,
                      categoria === cat.value && styles.categoryTextActive,
                    ]}
                  >
                    {cat.nombre}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Prioridad */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Prioridad</Text>
            <View style={styles.priorityContainer}>
              {priorities.map((p) => (
                <TouchableOpacity
                  key={p.value}
                  style={[
                    styles.priorityButton,
                    prioridad === p.value && {
                      backgroundColor: p.color + '20',
                      borderColor: p.color,
                    },
                  ]}
                  onPress={() => setPrioridad(p.value)}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      prioridad === p.value && { color: p.color },
                    ]}
                  >
                    {p.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Ubicación */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>
              Ubicación <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.locationInputContainer}>
              <TextInput
                style={styles.locationInput}
                placeholder="Ingresa la ubicación"
                placeholderTextColor={colors.textPlaceholder}
                value={ubicacion}
                onChangeText={setUbicacion}
              />
              <TouchableOpacity
                style={styles.locationButton}
                onPress={handleGetLocation}
              >
                <MaterialIcons name="my-location" size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Imagen */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Imagen (Opcional)</Text>
            {imagen ? (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: imagen }} style={styles.imagePreview} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => setImagen(null)}
                >
                  <MaterialIcons name="close" size={20} color={colors.textWhite} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={handleSelectImage}
              >
                <MaterialIcons name="add-photo-alternate" size={32} color={colors.primary} />
                <Text style={styles.uploadText}>Agregar Foto</Text>
                <Text style={styles.uploadSubtext}>
                  Ayuda a describir mejor el problema
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Botón de enviar */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <MaterialIcons name="send" size={20} color={colors.textWhite} />
            <Text style={styles.submitButtonText}>Crear Reporte</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  scrollContent: {
    paddingBottom: 40,
  },
  content: {
    padding: 20,
    paddingTop: 28,
  },

  // Header
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textGray,
    lineHeight: 20,
  },

  // Form
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 10,
  },
  required: {
    color: colors.danger,
  },
  input: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.textDark,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },

  // Categorías
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryCard: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.borderLight,
  },
  categoryCardActive: {
    backgroundColor: colors.primary + '15',
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textGray,
    flex: 1,
  },
  categoryTextActive: {
    color: colors.primary,
  },

  // Prioridad
  priorityContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.borderLight,
    alignItems: 'center',
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textGray,
  },

  // Ubicación
  locationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  locationInput: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.textDark,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  locationButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Imagen
  uploadButton: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.borderLight,
    borderStyle: 'dashed',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginTop: 12,
  },
  uploadSubtext: {
    fontSize: 13,
    color: colors.textGray,
    marginTop: 4,
  },
  imagePreviewContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  removeImageButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Submit button
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textWhite,
  },
});
