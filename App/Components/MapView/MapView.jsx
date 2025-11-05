import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';

const { width, height } = Dimensions.get('window');

// Configuración del mapa
const MAP_CONFIG = {
  defaultCenter: {
    latitude: 20.2745,
    longitude: -97.9557,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  regionBounds: {
    latMin: 20.1,
    latMax: 20.4,
    lngMin: -98.1,
    lngMax: -97.9,
  },
};

// Mapeo de colores por categoría
const CATEGORY_COLORS = {
  saneamiento: '#3b82f6',
  infraestructura: '#f59e0b',
  salud_publica: '#ef4444',
  seguridad: '#8b5cf6',
  medio_ambiente: '#10b981',
  servicios_publicos: '#06b6d4',
  transporte: '#f97316',
  otros: '#6b7280',
};

// Componente de marcador personalizado
const CustomMarker = ({ report, onPress }) => {
  const markerColor = CATEGORY_COLORS[report.categoria] || CATEGORY_COLORS.otros;

  return (
    <Marker
      coordinate={{
        latitude: report.latitud,
        longitude: report.longitud,
      }}
      onPress={onPress}
      pinColor={markerColor}
      identifier={`report-${report.id}`}
    >
      <View style={[styles.markerContainer, { backgroundColor: markerColor }]}>
        <MaterialIcons name="report-problem" size={20} color="white" />
      </View>
    </Marker>
  );
};

const MapViewComponent = ({
  reports = [],
  height = 500,
  initialRegion = null,
  showPopups = true,
  onMarkerPress = null,
  style,
}) => {
  const [region, setRegion] = useState(initialRegion || MAP_CONFIG.defaultCenter);
  const [selectedReport, setSelectedReport] = useState(null);
  const [mapError, setMapError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga del mapa
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Manejar el press en un marcador
  const handleMarkerPress = (report) => {
    setSelectedReport(report);
    if (onMarkerPress) {
      onMarkerPress(report);
    }
  };

  // Cerrar el popup de detalles
  const handleClosePopup = () => {
    setSelectedReport(null);
  };

  // Centrar el mapa en una ubicación específica
  const centerMapOnLocation = (latitude, longitude) => {
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  // Renderizar el popup de detalles del reporte
  const renderReportPopup = () => {
    if (!selectedReport || !showPopups) return null;

    return (
      <View style={styles.popupContainer}>
        <View style={styles.popup}>
          <View style={styles.popupHeader}>
            <Text style={styles.popupTitle} numberOfLines={2}>
              {selectedReport.titulo}
            </Text>
            <TouchableOpacity onPress={handleClosePopup} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color={colors.textDark} />
            </TouchableOpacity>
          </View>

          <View style={styles.popupContent}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{selectedReport.categoria}</Text>
            </View>

            <Text style={styles.popupDescription} numberOfLines={3}>
              {selectedReport.descripcion}
            </Text>

            <View style={styles.statusBadge}>
              <MaterialIcons
                name={
                  selectedReport.estado === 'resuelto'
                    ? 'check-circle'
                    : selectedReport.estado === 'en_proceso'
                    ? 'schedule'
                    : 'report-problem'
                }
                size={16}
                color={
                  selectedReport.estado === 'resuelto'
                    ? colors.success
                    : selectedReport.estado === 'en_proceso'
                    ? colors.warning
                    : colors.primary
                }
              />
              <Text style={styles.statusText}>
                {selectedReport.estado === 'resuelto'
                  ? 'Resuelto'
                  : selectedReport.estado === 'en_proceso'
                  ? 'En Proceso'
                  : selectedReport.estado === 'cerrado'
                  ? 'Cerrado'
                  : 'Nuevo'}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.viewDetailsButton}>
            <Text style={styles.viewDetailsText}>Ver Detalles</Text>
            <MaterialIcons name="chevron-right" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Manejar errores del mapa
  const handleMapError = (error) => {
    console.error('Map error:', error);
    setMapError('Error al cargar el mapa');
    setIsLoading(false);
  };

  // Si hay error, mostrar mensaje
  if (mapError) {
    return (
      <View style={[styles.errorContainer, { height }]}>
        <MaterialIcons name="error-outline" size={48} color={colors.danger} />
        <Text style={styles.errorText}>{mapError}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setMapError(null);
            setIsLoading(true);
          }}
        >
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { height }, style]}>
      <MapView
        style={styles.map}
        initialRegion={region}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation
        showsMyLocationButton
        showsCompass
        showsScale
        onError={handleMapError}
        loadingEnabled
        loadingIndicatorColor={colors.primary}
        loadingBackgroundColor={colors.backgroundWhite}
      >
        {reports.map((report) => (
          <CustomMarker
            key={report.id}
            report={report}
            onPress={() => handleMarkerPress(report)}
          />
        ))}
      </MapView>

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Cargando mapa...</Text>
        </View>
      )}

      {/* Popup de detalles */}
      {renderReportPopup()}

      {/* Contador de reportes */}
      {reports.length > 0 && (
        <View style={styles.reportCounter}>
          <MaterialIcons name="location-on" size={20} color={colors.primary} />
          <Text style={styles.reportCounterText}>
            {reports.length} reporte{reports.length !== 1 ? 's' : ''}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.backgroundLight,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  // Marcador personalizado
  markerContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.textWhite,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  // Popup de detalles
  popupContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  popup: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  popupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    flex: 1,
    marginRight: 10,
  },
  closeButton: {
    padding: 4,
  },
  popupContent: {
    marginBottom: 12,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    textTransform: 'capitalize',
  },
  popupDescription: {
    fontSize: 14,
    color: colors.textGray,
    lineHeight: 20,
    marginBottom: 10,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary + '15',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 4,
  },
  viewDetailsText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
  },

  // Loading
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.textGray,
    fontWeight: '600',
  },

  // Error
  errorContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    padding: 20,
    borderRadius: 16,
  },
  errorText: {
    fontSize: 16,
    color: colors.textDark,
    marginTop: 12,
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    color: colors.textWhite,
    fontSize: 15,
    fontWeight: '600',
  },

  // Contador de reportes
  reportCounter: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: colors.backgroundWhite,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  reportCounterText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textDark,
  },
});

export default MapViewComponent;
