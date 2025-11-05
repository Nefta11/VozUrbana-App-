import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../utils/colors';
import { useReports } from '../hooks/useReports';
import ReportCard from '../Components/ReportCard/ReportCard';
// import MapView from '../Components/MapView/MapView'; // Temporalmente deshabilitado

export default function ReportsScreen({ navigation, route }) {
  const categoryParam = route?.params?.category || null;

  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('list'); // 'list' o 'map'
  const [showFilters, setShowFilters] = useState(false);

  // Hook de reportes con filtros
  const { filteredReports, categories, isLoading } = useReports({
    category: selectedCategory,
    status: selectedStatus,
    priority: selectedPriority,
    search: searchText,
    sortBy: sortBy,
  });

  // Estados disponibles
  const statuses = [
    { value: null, label: 'Todos' },
    { value: 'nuevo', label: 'Nuevo' },
    { value: 'en_proceso', label: 'En Proceso' },
    { value: 'resuelto', label: 'Resuelto' },
    { value: 'cerrado', label: 'Cerrado' },
  ];

  // Prioridades disponibles
  const priorities = [
    { value: null, label: 'Todas' },
    { value: 'alta', label: 'Alta' },
    { value: 'media', label: 'Media' },
    { value: 'baja', label: 'Baja' },
  ];

  // Opciones de ordenamiento
  const sortOptions = [
    { value: 'newest', label: 'Más recientes' },
    { value: 'oldest', label: 'Más antiguos' },
    { value: 'most_voted', label: 'Más votados' },
  ];

  const handleReportPress = (report) => {
    navigation.navigate('ReportDetail', { reportId: report.id });
  };

  const handleClearFilters = () => {
    setSearchText('');
    setSelectedCategory(null);
    setSelectedStatus(null);
    setSelectedPriority(null);
    setSortBy('newest');
  };

  const renderFilterChip = (label, isActive, onPress) => (
    <TouchableOpacity
      style={[styles.filterChip, isActive && styles.filterChipActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color={colors.textGray} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar reportes..."
          placeholderTextColor={colors.textPlaceholder}
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText !== '' && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <MaterialIcons name="close" size={20} color={colors.textGray} />
          </TouchableOpacity>
        )}
      </View>

      {/* Controles de vista y filtros */}
      <View style={styles.controlsContainer}>
        <View style={styles.viewModeContainer}>
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'list' && styles.viewModeButtonActive]}
            onPress={() => setViewMode('list')}
          >
            <MaterialIcons
              name="list"
              size={20}
              color={viewMode === 'list' ? colors.primary : colors.textGray}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'map' && styles.viewModeButtonActive]}
            onPress={() => setViewMode('map')}
          >
            <MaterialIcons
              name="map"
              size={20}
              color={viewMode === 'map' ? colors.primary : colors.textGray}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <MaterialIcons name="tune" size={20} color={colors.primary} />
          <Text style={styles.filterButtonText}>Filtros</Text>
        </TouchableOpacity>
      </View>

      {/* Panel de filtros expandible */}
      {showFilters && (
        <View style={styles.filtersPanel}>
          {/* Categorías */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Categoría</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterChipsContainer}>
                {renderFilterChip('Todas', selectedCategory === null, () =>
                  setSelectedCategory(null)
                )}
                {categories.map((cat) =>
                  renderFilterChip(
                    cat.nombre,
                    selectedCategory === cat.nombre.toLowerCase(),
                    () => setSelectedCategory(cat.nombre.toLowerCase())
                  )
                )}
              </View>
            </ScrollView>
          </View>

          {/* Estados */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Estado</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterChipsContainer}>
                {statuses.map((status) =>
                  renderFilterChip(
                    status.label,
                    selectedStatus === status.value,
                    () => setSelectedStatus(status.value)
                  )
                )}
              </View>
            </ScrollView>
          </View>

          {/* Prioridades */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Prioridad</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterChipsContainer}>
                {priorities.map((priority) =>
                  renderFilterChip(
                    priority.label,
                    selectedPriority === priority.value,
                    () => setSelectedPriority(priority.value)
                  )
                )}
              </View>
            </ScrollView>
          </View>

          {/* Ordenamiento */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Ordenar por</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterChipsContainer}>
                {sortOptions.map((option) =>
                  renderFilterChip(option.label, sortBy === option.value, () =>
                    setSortBy(option.value)
                  )
                )}
              </View>
            </ScrollView>
          </View>

          {/* Botón limpiar filtros */}
          <TouchableOpacity style={styles.clearFiltersButton} onPress={handleClearFilters}>
            <MaterialIcons name="clear-all" size={20} color={colors.textWhite} />
            <Text style={styles.clearFiltersText}>Limpiar Filtros</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Contador de resultados */}
      <View style={styles.resultsCounter}>
        <Text style={styles.resultsCounterText}>
          {filteredReports.length} reporte{filteredReports.length !== 1 ? 's' : ''} encontrado
          {filteredReports.length !== 1 ? 's' : ''}
        </Text>
      </View>
    </View>
  );

  const renderReportItem = ({ item }) => (
    <ReportCard report={item} onPress={handleReportPress} />
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Cargando reportes...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.backgroundWhite} />

      {viewMode === 'list' ? (
        <FlatList
          data={filteredReports}
          renderItem={renderReportItem}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialIcons name="inbox" size={64} color={colors.borderLight} />
              <Text style={styles.emptyText}>No se encontraron reportes</Text>
              <Text style={styles.emptySubtext}>
                Intenta ajustar los filtros de búsqueda
              </Text>
            </View>
          }
        />
      ) : (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {renderHeader()}
          <View style={styles.mapContainer}>
            {/* Placeholder temporal para el mapa */}
            <View style={styles.mapPlaceholder}>
              <MaterialIcons name="map" size={64} color={colors.borderLight} />
              <Text style={styles.mapPlaceholderText}>Vista de mapa</Text>
              <Text style={styles.mapPlaceholderSubtext}>
                Próximamente disponible
              </Text>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Botón flotante para crear reporte */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateReport')}
        activeOpacity={0.8}
      >
        <MaterialIcons name="add" size={28} color={colors.textWhite} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
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

  // Header
  header: {
    backgroundColor: colors.backgroundWhite,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: colors.textDark,
  },

  // Controles
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  viewModeContainer: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 4,
  },
  viewModeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewModeButtonActive: {
    backgroundColor: colors.backgroundWhite,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.primary + '15',
    borderRadius: 12,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },

  // Panel de filtros
  filtersPanel: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 10,
  },
  filterChipsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.backgroundLight,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textDark,
  },
  filterChipTextActive: {
    color: colors.textWhite,
  },
  clearFiltersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.danger,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  clearFiltersText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textWhite,
  },

  // Contador de resultados
  resultsCounter: {
    marginTop: 12,
  },
  resultsCounterText: {
    fontSize: 13,
    color: colors.textGray,
    fontWeight: '500',
  },

  // Lista
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },

  // Empty state
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textGray,
    marginTop: 8,
    textAlign: 'center',
  },

  // Mapa
  mapContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  mapPlaceholder: {
    height: 400,
    backgroundColor: colors.backgroundLight,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.borderLight,
    borderStyle: 'dashed',
  },
  mapPlaceholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
    marginTop: 16,
  },
  mapPlaceholderSubtext: {
    fontSize: 14,
    color: colors.textGray,
    marginTop: 8,
  },

  // FAB
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
