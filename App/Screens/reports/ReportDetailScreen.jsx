import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import { useReports } from '../../hooks/useReports';
import { getStatusConfig } from '../../utils/reportConfig';
import { formatDateLong } from '../../utils/dateHelpers';
import CustomHeader from '../../Components/navigation/CustomHeader';
import LeafletMap from '../../Components/MapView/LeafletMap';

export default function ReportDetailScreen({ navigation, route }) {
  const { reportId } = route.params;
  const { getReportById } = useReports();

  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [userVote, setUserVote] = useState(null);
  const [votes, setVotes] = useState({ positivos: 0, negativos: 0 });

  useEffect(() => {
    loadReport();
  }, [reportId]);

  const loadReport = () => {
    setIsLoading(true);
    // Simular carga
    setTimeout(() => {
      const reportData = getReportById(reportId);
      if (reportData) {
        setReport(reportData);
        setVotes({
          positivos: reportData.votos_positivos,
          negativos: reportData.votos_negativos,
        });
      }
      setIsLoading(false);
    }, 500);
  };

  const handleVote = (voteType) => {
    if (userVote === voteType) {
      // Quitar voto
      setVotes((prev) => ({
        ...prev,
        [voteType === 'up' ? 'positivos' : 'negativos']:
          prev[voteType === 'up' ? 'positivos' : 'negativos'] - 1,
      }));
      setUserVote(null);
    } else {
      // Agregar o cambiar voto
      const newVotes = { ...votes };
      if (userVote) {
        newVotes[userVote === 'up' ? 'positivos' : 'negativos']--;
      }
      newVotes[voteType === 'up' ? 'positivos' : 'negativos']++;
      setVotes(newVotes);
      setUserVote(voteType);
    }
  };

  const handleAddComment = () => {
    if (commentText.trim() === '') {
      Alert.alert('Error', 'Por favor escribe un comentario');
      return;
    }

    // TODO: Enviar comentario al backend
    Alert.alert('Éxito', 'Comentario agregado correctamente');
    setCommentText('');
  };

  const handleShare = () => {
    Alert.alert('Compartir', 'Funcionalidad de compartir en desarrollo');
  };

  const handleInfoPress = () => {
    Alert.alert('Información', 'Detalle del reporte seleccionado');
  };

  const handleNotificationPress = () => {
    Alert.alert('Notificaciones', 'No tienes notificaciones nuevas');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Cargando reporte...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!report) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <MaterialIcons name="error-outline" size={64} color={colors.danger} />
          <Text style={styles.errorText}>Reporte no encontrado</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const statusInfo = getStatusConfig(report.estado);

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <CustomHeader 
        onInfoPress={handleInfoPress}
        onNotificationPress={handleNotificationPress}
      />
      
      {/* Back to Reports */}
      <View style={styles.backContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios" size={16} color={colors.primary} />
          <Text style={styles.backText}>Volver a Reportes</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Report Content */}
        <View style={styles.reportContainer}>
          {/* Large Report Image */}
          {report.imagen ? (
            <Image source={{ uri: report.imagen }} style={styles.reportImage} resizeMode="cover" />
          ) : (
            <View style={styles.noImageContainer}>
              <MaterialIcons name="image" size={64} color={colors.borderLight} />
              <Text style={styles.noImageText}>Sin imagen</Text>
            </View>
          )}

          {/* Status Badge - positioned over image */}
          <View style={styles.statusBadgeContainer}>
            <View style={[styles.statusBadge, { backgroundColor: statusInfo.bgColor }]}>
              <MaterialIcons name={statusInfo.icon} size={16} color={statusInfo.color} />
              <Text style={[styles.statusText, { color: statusInfo.color }]}>
                {statusInfo.text}
              </Text>
            </View>
          </View>
        </View>

        {/* Content - Outside the image container */}
        <View style={styles.contentContainer}>
          {/* Title */}
          <Text style={styles.title}>{report.titulo}</Text>

          {/* Category Badge */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{report.categoria}</Text>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripción</Text>
            <Text style={styles.description}>{report.descripcion}</Text>
          </View>

          {/* Meta Info */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <MaterialIcons name="person" size={16} color={colors.textGray} />
              <Text style={styles.metaText}>{report.usuario || 'Grimaldo Mendez Martins'}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <MaterialIcons name="calendar-today" size={16} color={colors.textGray} />
              <Text style={styles.metaText}>22 de Octubre 25</Text>
            </View>
            
            <View style={styles.metaItem}>
              <MaterialIcons name="location-on" size={16} color={colors.textGray} />
              <Text style={styles.metaText}>Unidad Deportiva Oceancanta, Xicotepec, Puebla, 73500 México</Text>
            </View>
          </View>

          {/* Voting Section */}
          <View style={styles.voteContainer}>
            <TouchableOpacity
              style={[styles.voteButton, {
                backgroundColor: userVote === 'up' ? '#16a34a' : 'transparent',
                borderColor: '#16a34a',
              }]}
              onPress={() => handleVote('up')}
            >
              <Ionicons
                name={userVote === 'up' ? 'thumbs-up' : 'thumbs-up-outline'}
                size={18}
                color={userVote === 'up' ? '#ffffff' : '#16a34a'}
              />
              <Text style={[styles.voteText, { color: userVote === 'up' ? '#ffffff' : '#16a34a' }]}>
                {votes.positivos}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.voteButton, {
                backgroundColor: userVote === 'down' ? '#dc2626' : 'transparent',
                borderColor: '#dc2626',
              }]}
              onPress={() => handleVote('down')}
            >
              <Ionicons
                name={userVote === 'down' ? 'thumbs-down' : 'thumbs-down-outline'}
                size={18}
                color={userVote === 'down' ? '#ffffff' : '#dc2626'}
              />
              <Text style={[styles.voteText, { color: userVote === 'down' ? '#ffffff' : '#dc2626' }]}>
                {votes.negativos}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Comments Counter */}
          <View style={styles.commentsCounter}>
            <MaterialIcons name="chat-bubble-outline" size={16} color={colors.textGray} />
            <Text style={styles.commentsCountText}>
              {report.comentarios?.length || 0} comentario{(report.comentarios?.length || 0) !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>

        {/* Map Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ubicación</Text>
          <View style={styles.mapContainer}>
            <LeafletMap
              reports={[report]}
              onLocationSelect={null}
              selectable={false}
              style={styles.mapView}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  
  // Back Navigation
  backContainer: {
    backgroundColor: colors.backgroundWhite,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  
  // Report Container - Only for image
  reportContainer: {
    backgroundColor: colors.backgroundWhite,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Large Image
  reportImage: {
    width: '100%',
    height: 250,
  },
  noImageContainer: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
  },
  noImageText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.textGray,
    fontWeight: '500',
  },
  
  // Status Badge - positioned over image
  statusBadgeContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  // Content Container - Separate from image
  contentContainer: {
    backgroundColor: colors.backgroundWhite,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 12,
    lineHeight: 24,
  },
  
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#fef2f2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ef4444',
  },
  
  // Sections
  section: {
    marginBottom: 20,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.textGray,
    lineHeight: 20,
  },
  
  // Meta Information
  metaRow: {
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  metaText: {
    fontSize: 12,
    color: colors.textGray,
    fontWeight: '500',
    flex: 1,
  },
  
  // Voting
  voteContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  voteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
  },
  voteText: {
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Comments Counter
  commentsCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  commentsCountText: {
    fontSize: 12,
    color: colors.textGray,
    fontWeight: '500',
  },
  
  // Map
  mapContainer: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 300,
  },
  mapView: {
    height: 300,
  },
  
  // Loading and Error States
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textGray,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginTop: 16,
    marginBottom: 24,
  },
});
