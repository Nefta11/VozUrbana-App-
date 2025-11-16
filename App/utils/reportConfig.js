import { colors } from './colors';

// Configuración de estados de reportes
export const STATUS_CONFIG = {
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

// Configuración de prioridades
export const PRIORITY_CONFIG = {
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

// Configuración de categorías
export const CATEGORY_CONFIG = {
  'salud publica': {
    icon: 'favorite',
    color: '#ef4444',
    bgColor: '#fef2f2',
  },
  infraestructura: {
    icon: 'build',
    color: '#f59e0b',
    bgColor: '#fffbeb',
  },
  servicios: {
    icon: 'miscellaneous-services',
    color: colors.primary,
    bgColor: colors.primary + '15',
  },
  seguridad: {
    icon: 'security',
    color: '#dc2626',
    bgColor: '#fef2f2',
  },
  'medio ambiente': {
    icon: 'eco',
    color: '#16a34a',
    bgColor: '#f0fdf4',
  },
  transporte: {
    icon: 'directions-bus',
    color: '#9333ea',
    bgColor: '#faf5ff',
  },
};

// Función helper para obtener configuración de categoría
export const getCategoryConfig = (category) => {
  const categoryKey = category?.toLowerCase() || '';
  return CATEGORY_CONFIG[categoryKey] || {
    icon: 'label',
    color: colors.primary,
    bgColor: colors.primary + '15',
  };
};

// Función helper para obtener configuración de estado
export const getStatusConfig = (status) => {
  return STATUS_CONFIG[status] || STATUS_CONFIG.nuevo;
};

// Función helper para obtener configuración de prioridad
export const getPriorityConfig = (priority) => {
  return PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.media;
};
