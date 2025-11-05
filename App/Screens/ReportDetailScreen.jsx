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
import { colors } from '../utils/colors';
import { useReports } from '../hooks/useReports';

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
  cerrado: {
    text: 'Cerrado',
    icon: 'cancel',
    color: colors.textGray,
    bgColor: 'rgba(107, 114, 128, 0.15)',
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
      <StatusBar barStyle="dark-content" backgroundColor={colors.backgroundWhite} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Imagen del reporte */}
          {report.imagen ? (
            <Image source={{ uri: report.imagen }} style={styles.reportImage} />
          ) : (
            <View style={styles.noImageContainer}>
              <MaterialIcons name="image" size={64} color={colors.borderLight} />
              <Text style={styles.noImageText}>Sin imagen</Text>
            </View>
          )}

          {/* Contenido principal */}
          <View style={styles.content}>
            {/* Header con estado y compartir */}
            <View style={styles.headerRow}>
              <View style={[styles.statusBadge, { backgroundColor: statusInfo.bgColor }]}>
                <MaterialIcons name={statusInfo.icon} size={18} color={statusInfo.color} />
                <Text style={[styles.statusText, { color: statusInfo.color }]}>
                  {statusInfo.text}
                </Text>
              </View>
              <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                <Ionicons name="share-social" size={20} color={colors.primary} />
              </TouchableOpacity>
            </View>

            {/* Título */}
            <Text style={styles.title}>{report.titulo}</Text>

            {/* Meta información */}
            <View style={styles.metaContainer}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{report.categoria}</Text>
              </View>
              <View style={styles.dateContainer}>
                <MaterialIcons name="calendar-today" size={14} color={colors.textGray} />
                <Text style={styles.dateText}>{formatDate(report.fecha_creacion)}</Text>
              </View>
            </View>

            {/* Descripción */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Descripción</Text>
              <Text style={styles.description}>{report.descripcion}</Text>
            </View>

            {/* Ubicación */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Ubicación</Text>
              <View style={styles.locationContainer}>
                <MaterialIcons name="location-on" size={20} color={colors.primary} />
                <Text style={styles.locationText}>{report.ubicacion}</Text>
              </View>
            </View>

            {/* Votación */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>¿Es útil este reporte?</Text>
              <View style={styles.voteContainer}>
                <TouchableOpacity
                  style={[styles.voteButton, userVote === 'up' && styles.voteButtonActive]}
                  onPress={() => handleVote('up')}
                >
                  <Ionicons
                    name={userVote === 'up' ? 'thumbs-up' : 'thumbs-up-outline'}
                    size={24}
                    color={userVote === 'up' ? colors.success : colors.textGray}
                  />
                  <Text
                    style={[
                      styles.voteText,
                      userVote === 'up' && styles.voteTextActive,
                    ]}
                  >
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
                    size={24}
                    color={userVote === 'down' ? colors.danger : colors.textGray}
                  />
                  <Text
                    style={[
                      styles.voteText,
                      userVote === 'down' && styles.voteTextActive,
                    ]}
                  >
                    {votes.negativos}
                  </Text>
                  <Text style={styles.voteLabel}>No útil</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Comentarios */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Comentarios ({report.comentarios?.length || 0})
              </Text>

              {/* Campo para agregar comentario */}
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
                  <MaterialIcons name="send" size={20} color={colors.textWhite} />
                </TouchableOpacity>
              </View>

              {/* Lista de comentarios */}
              {report.comentarios && report.comentarios.length > 0 ? (
                report.comentarios.map((comment, index) => (
                  <View key={index} style={styles.commentItem}>
                    <View style={styles.commentHeader}>
                      <View style={styles.commentAvatar}>
                        <MaterialIcons name="person" size={20} color={colors.textWhite} />
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
  backButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    color: colors.textWhite,
    fontSize: 15,
    fontWeight: '600',
  },

  // Imagen
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

  // Contenido
  content: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Título
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 16,
    lineHeight: 32,
  },

  // Meta
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  categoryBadge: {
    backgroundColor: colors.primary + '15',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
    textTransform: 'capitalize',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 13,
    color: colors.textGray,
    fontWeight: '500',
  },

  // Secciones
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: colors.textGray,
    lineHeight: 24,
  },

  // Ubicación
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
  },
  locationText: {
    fontSize: 15,
    color: colors.textDark,
    fontWeight: '500',
    flex: 1,
  },

  // Votación
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
    backgroundColor: colors.primary + '10',
    borderColor: colors.primary + '30',
  },
  voteText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textDark,
    marginTop: 8,
  },
  voteTextActive: {
    color: colors.primary,
  },
  voteLabel: {
    fontSize: 13,
    color: colors.textGray,
    fontWeight: '600',
    marginTop: 4,
  },

  // Comentarios
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
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  commentInfo: {
    flex: 1,
  },
  commentAuthor: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 2,
  },
  commentDate: {
    fontSize: 12,
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
