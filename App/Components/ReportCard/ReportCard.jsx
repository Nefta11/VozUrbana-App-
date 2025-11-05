import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';

const { width } = Dimensions.get('window');

// Configuración de prioridades
const PRIORITY_CONFIG = {
  alta: {
    color: '#ef4444',
    text: 'Alta Prioridad',
  },
  media: {
    color: '#f59e0b',
    text: 'Prioridad Media',
  },
  baja: {
    color: '#10b981',
    text: 'Baja Prioridad',
  },
};

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
  no_aprobado: {
    text: 'No Aprobado',
    icon: 'close',
    color: colors.danger,
    bgColor: 'rgba(239, 68, 68, 0.15)',
  },
};

// Función para formatear fechas
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
};

// Componente de badge de categoría
const CategoryBadge = ({ category }) => (
  <View style={styles.categoryBadge}>
    <Text style={styles.categoryBadgeText}>{category}</Text>
  </View>
);

// Componente de badge de estado
const StatusBadge = ({ status }) => {
  const statusInfo = STATUS_CONFIG[status] || STATUS_CONFIG.nuevo;

  return (
    <View style={[styles.statusBadge, { backgroundColor: statusInfo.bgColor }]}>
      <MaterialIcons name={statusInfo.icon} size={16} color={statusInfo.color} />
      <Text style={[styles.statusBadgeText, { color: statusInfo.color }]}>
        {statusInfo.text}
      </Text>
    </View>
  );
};

// Componente de imagen del reporte
const ReportImage = ({ imageUrl, title }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  if (imageError || !imageUrl) {
    return (
      <View style={styles.noImageContainer}>
        <MaterialIcons name="image" size={48} color={colors.borderLight} />
        <Text style={styles.noImageText}>Sin imagen</Text>
      </View>
    );
  }

  return (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.reportImage}
        onLoad={handleImageLoad}
        onError={handleImageError}
        resizeMode="cover"
      />
      {imageLoading && (
        <View style={styles.imageLoadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
    </View>
  );
};

// Componente de botones de votación
const VoteButtons = ({ reportId, initialVotes, compact = false }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState(null);

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
        // Si ya había votado, restar el voto anterior
        newVotes[userVote === 'up' ? 'positivos' : 'negativos']--;
      }
      newVotes[voteType === 'up' ? 'positivos' : 'negativos']++;
      setVotes(newVotes);
      setUserVote(voteType);
    }
  };

  return (
    <View style={styles.voteContainer}>
      <TouchableOpacity
        style={[
          styles.voteButton,
          userVote === 'up' && styles.voteButtonActive,
          compact && styles.voteButtonCompact,
        ]}
        onPress={() => handleVote('up')}
      >
        <Ionicons
          name={userVote === 'up' ? 'thumbs-up' : 'thumbs-up-outline'}
          size={compact ? 16 : 18}
          color={userVote === 'up' ? colors.success : colors.textGray}
        />
        <Text
          style={[
            styles.voteText,
            userVote === 'up' && styles.voteTextActive,
            compact && styles.voteTextCompact,
          ]}
        >
          {votes.positivos}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.voteButton,
          userVote === 'down' && styles.voteButtonActive,
          compact && styles.voteButtonCompact,
        ]}
        onPress={() => handleVote('down')}
      >
        <Ionicons
          name={userVote === 'down' ? 'thumbs-down' : 'thumbs-down-outline'}
          size={compact ? 16 : 18}
          color={userVote === 'down' ? colors.danger : colors.textGray}
        />
        <Text
          style={[
            styles.voteText,
            userVote === 'down' && styles.voteTextActive,
            compact && styles.voteTextCompact,
          ]}
        >
          {votes.negativos}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Componente principal ReportCard
const ReportCard = ({ report, onPress }) => {
  const priorityInfo = PRIORITY_CONFIG[report.prioridad] || PRIORITY_CONFIG.media;
  const commentsCount = report.comentarios?.length || 0;
  const formattedDate = formatDate(report.fecha_creacion);

  const handlePress = () => {
    if (onPress) {
      onPress(report);
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {/* Indicador de prioridad */}
      <View style={[styles.priorityIndicator, { backgroundColor: priorityInfo.color }]} />

      {/* Imagen del reporte */}
      <View style={styles.imageSection}>
        <ReportImage imageUrl={report.imagen} title={report.titulo} />
        <View style={styles.statusBadgeContainer}>
          <StatusBadge status={report.estado} />
        </View>
      </View>

      {/* Contenido del reporte */}
      <View style={styles.content}>
        {/* Título */}
        <Text style={styles.title} numberOfLines={2}>
          {report.titulo}
        </Text>

        {/* Meta información */}
        <View style={styles.metaContainer}>
          <CategoryBadge category={report.categoria} />
          <View style={styles.dateContainer}>
            <MaterialIcons name="calendar-today" size={14} color={colors.textGray} />
            <Text style={styles.dateText}>{formattedDate}</Text>
          </View>
        </View>

        {/* Descripción */}
        <Text style={styles.description} numberOfLines={3}>
          {report.descripcion}
        </Text>

        {/* Ubicación */}
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={16} color={colors.primary} />
          <Text style={styles.locationText} numberOfLines={1}>
            {report.ubicacion}
          </Text>
        </View>

        {/* Footer con votación y comentarios */}
        <View style={styles.footer}>
          <VoteButtons
            reportId={report.id}
            initialVotes={{
              positivos: report.votos_positivos,
              negativos: report.votos_negativos,
            }}
            compact
          />

          <TouchableOpacity style={styles.commentsButton} onPress={handlePress}>
            <MaterialIcons name="comment" size={18} color={colors.textGray} />
            <Text style={styles.commentsText}>
              {commentsCount} comentario{commentsCount !== 1 ? 's' : ''}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },

  // Indicador de prioridad
  priorityIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 6,
    height: '100%',
    zIndex: 10,
  },

  // Sección de imagen
  imageSection: {
    position: 'relative',
    height: 200,
    backgroundColor: colors.backgroundLight,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  reportImage: {
    width: '100%',
    height: '100%',
  },
  imageLoadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
  },
  noImageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
  },
  noImageText: {
    marginTop: 8,
    fontSize: 14,
    color: colors.textGray,
    fontWeight: '500',
  },

  // Status badge
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
    borderRadius: 20,
    gap: 6,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  // Contenido
  content: {
    padding: 16,
    paddingLeft: 22, // Espacio para el indicador de prioridad
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: 12,
    lineHeight: 24,
  },

  // Meta información
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: colors.primary + '15',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: 12,
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

  // Descripción
  description: {
    fontSize: 14,
    color: colors.textGray,
    lineHeight: 20,
    marginBottom: 12,
  },

  // Ubicación
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
  },
  locationText: {
    fontSize: 13,
    color: colors.textDark,
    fontWeight: '500',
    flex: 1,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },

  // Votación
  voteContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  voteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  voteButtonActive: {
    backgroundColor: colors.primary + '10',
    borderColor: colors.primary + '30',
  },
  voteButtonCompact: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  voteText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textGray,
  },
  voteTextActive: {
    color: colors.textDark,
  },
  voteTextCompact: {
    fontSize: 13,
  },

  // Comentarios
  commentsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  commentsText: {
    fontSize: 13,
    color: colors.textGray,
    fontWeight: '600',
  },
});

export default ReportCard;
