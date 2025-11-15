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

// Configuración de estados
const STATUS_CONFIG = {
  nuevo: {
    text: 'Nuevo',
    icon: 'report-problem',
    color: colors.primary,
    bgColor: 'rgba(59, 130, 246, 0.15)',
  },
  en_proceso: {
    text: 'En Proceso',
    icon: 'schedule',
    color: colors.warning,
    bgColor: 'rgba(245, 158, 11, 0.15)',
  },
  resuelto: {
    text: 'Resuelto',
    icon: 'check-circle',
    color: colors.success,
    bgColor: 'rgba(16, 185, 129, 0.15)',
  },

};

// Función para formatear fechas
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleDateString('es-ES', options);
};

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

  const statusInfo = STATUS_CONFIG[report.estado] || STATUS_CONFIG.nuevo;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0043CE" />

      {/* Blue Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.textWhite} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle del Reporte</Text>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Ionicons name="share-social" size={22} color={colors.textWhite} />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Large Report Image */}
          {report.imagen ? (
            <Image source={{ uri: report.imagen }} style={styles.reportImage} />
          ) : (
            <View style={styles.noImageContainer}>
              <MaterialIcons name="image" size={64} color={colors.borderLight} />
              <Text style={styles.noImageText}>Sin imagen</Text>
            </View>
          )}

          {/* Content */}
          <View style={styles.content}>
            {/* Status Badge */}
            <View style={styles.statusContainer}>
              <View style={[styles.statusBadge, { backgroundColor: statusInfo.bgColor }]}>
                <MaterialIcons name={statusInfo.icon} size={16} color={statusInfo.color} />
                <Text style={[styles.statusText, { color: statusInfo.color }]}>
                  {statusInfo.text}
                </Text>
              </View>
            </View>

            {/* Title */}
            <Text style={styles.title}>{report.titulo}</Text>

            {/* Category and Date */}
            <View style={styles.metaContainer}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{report.categoria}</Text>
              </View>
              <View style={styles.dateContainer}>
                <MaterialIcons name="schedule" size={16} color={colors.textGray} />
                <Text style={styles.dateText}>{formatDate(report.fecha_creacion)}</Text>
              </View>
            </View>

            {/* Description */}
            <View style={styles.section}>
              <Text style={styles.description}>{report.descripcion}</Text>
            </View>

            {/* Location with Map Preview */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ubicación</Text>
              <View style={styles.locationCard}>
                <View style={styles.locationInfo}>
                  <MaterialIcons name="location-on" size={20} color="#0043CE" />
                  <Text style={styles.locationText}>{report.ubicacion}</Text>
                </View>
                
                <View style={styles.mapPreview}>
                  <MaterialIcons name="map" size={40} color={colors.textGray} />
                  <Text style={styles.mapText}>Ver en mapa</Text>
                </View>
              </View>
            </View>

            {/* Voting Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>¿Es útil este reporte?</Text>
              <View style={styles.voteContainer}>
                <TouchableOpacity
                  style={[styles.voteButton, userVote === 'up' && styles.voteButtonActive]}
                  onPress={() => handleVote('up')}
                >
                  <Ionicons
                    name={userVote === 'up' ? 'thumbs-up' : 'thumbs-up-outline'}
                    size={22}
                    color={userVote === 'up' ? "#0043CE" : colors.textGray}
                  />
                  <Text style={[styles.voteText, userVote === 'up' && styles.voteTextActive]}>
                    {votes.positivos}
                  </Text>
                  <Text style={styles.voteLabel}>Útil</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.voteButton, userVote === 'down' && styles.voteButtonActive]}
                  onPress={() => handleVote('down')}
                >
                  <Ionicons
                    name={userVote === 'down' ? 'thumbs-down' : 'thumbs-down-outline'}
                    size={22}
                    color={userVote === 'down' ? colors.danger : colors.textGray}
                  />
                  <Text style={[styles.voteText, userVote === 'down' && styles.voteTextActive]}>
                    {votes.negativos}
                  </Text>
                  <Text style={styles.voteLabel}>No útil</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Comments Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Comentarios ({report.comentarios?.length || 0})
              </Text>

              {/* Add Comment */}
              <View style={styles.addCommentContainer}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Escribe un comentario..."
                  placeholderTextColor={colors.textPlaceholder}
                  value={commentText}
                  onChangeText={setCommentText}
                  multiline
                />
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={handleAddComment}
                >
                  <MaterialIcons name="send" size={18} color={colors.textWhite} />
                </TouchableOpacity>
              </View>

              {/* Comments List */}
              {report.comentarios && report.comentarios.length > 0 ? (
                report.comentarios.map((comment, index) => (
                  <View key={index} style={styles.commentItem}>
                    <View style={styles.commentHeader}>
                      <View style={styles.commentAvatar}>
                        <MaterialIcons name="person" size={18} color={colors.textWhite} />
                      </View>
                      <View style={styles.commentInfo}>
                        <Text style={styles.commentAuthor}>
                          {comment.usuario || 'Usuario'}
                        </Text>
                        <Text style={styles.commentDate}>
                          {formatDate(comment.fecha || report.fecha_creacion)}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.commentText}>
                      {comment.texto || 'Comentario de ejemplo'}
                    </Text>
                  </View>
                ))
              ) : (
                <View style={styles.noCommentsContainer}>
                  <Text style={styles.noCommentsText}>
                    No hay comentarios aún. ¡Sé el primero en comentar!
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  flex: {
    flex: 1,
  },
  
  // Blue Header
  header: {
    backgroundColor: '#0043CE',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 16,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.textWhite + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textWhite,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.textWhite + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  scrollView: {
    flex: 1,
  },
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

  // Large Image
  reportImage: {
    width: '100%',
    height: 300,
  },
  noImageContainer: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
  },
  noImageText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.textGray,
    fontWeight: '500',
  },

  // Content
  content: {
    padding: 20,
  },
  
  // Status Badge
  statusContainer: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  // Title
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 16,
    lineHeight: 32,
  },

  // Meta Information
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  categoryBadge: {
    backgroundColor: '#0043CE' + '15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0043CE',
    textTransform: 'capitalize',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 12,
    color: colors.textGray,
    fontWeight: '500',
  },

  // Sections
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.textGray,
    lineHeight: 24,
  },

  // Location with Map
  locationCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationText: {
    fontSize: 15,
    color: colors.textDark,
    fontWeight: '500',
    flex: 1,
  },
  mapPreview: {
    height: 120,
    backgroundColor: colors.backgroundWhite,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.borderLight,
    borderStyle: 'dashed',
  },
  mapText: {
    fontSize: 14,
    color: colors.textGray,
    marginTop: 8,
    fontWeight: '500',
  },

  // Voting
  voteContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  voteButton: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.borderLight,
  },
  voteButtonActive: {
    backgroundColor: '#0043CE' + '10',
    borderColor: '#0043CE' + '30',
  },
  voteText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textDark,
    marginTop: 8,
  },
  voteTextActive: {
    color: '#0043CE',
  },
  voteLabel: {
    fontSize: 12,
    color: colors.textGray,
    fontWeight: '600',
    marginTop: 4,
  },

  // Comments
  addCommentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    marginBottom: 20,
  },
  commentInput: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.textDark,
    maxHeight: 100,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0043CE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentItem: {
    backgroundColor: colors.backgroundLight,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0043CE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  commentInfo: {
    flex: 1,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 2,
  },
  commentDate: {
    fontSize: 11,
    color: colors.textGray,
  },
  commentText: {
    fontSize: 14,
    color: colors.textGray,
    lineHeight: 20,
  },
  noCommentsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noCommentsText: {
    fontSize: 14,
    color: colors.textGray,
    textAlign: 'center',
  },
});
