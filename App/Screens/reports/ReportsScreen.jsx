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
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../utils/colors';
import { useReports } from '../../hooks/useReports';
import ReportCard from '../../Components/ReportCard/ReportCard';
import CustomHeader from '../../Components/navigation/CustomHeader';
import LeafletMap from '../../Components/MapView/LeafletMap';

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

  const handleInfoPress = () => {
    Alert.alert('Información', 'Lista de todos los reportes de la comunidad');
  };

  const handleNotificationPress = () => {
    Alert.alert('Notificaciones', 'No tienes notificaciones nuevas');
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
    <View style={styles.container}>
      {/* Custom Header como en la imagen */}
      <CustomHeader 
        onInfoPress={handleInfoPress}
        onNotificationPress={handleNotificationPress}
      />
      
      {/* Content Section */}
      <View style={styles.contentSection}>
        <Text style={styles.pageTitle}>Reportes Ciudadanos</Text>
        <Text style={styles.pageSubtitle}>Explora los reportes enviados por la comunidad</Text>
        
        {/* Lista/Mapa Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'list' && styles.toggleButtonActive]}
            onPress={() => setViewMode('list')}
          >
            <MaterialIcons name="view-list" size={18} color={viewMode === 'list' ? colors.primary : colors.textGray} />
            <Text style={[styles.toggleText, viewMode === 'list' && styles.toggleTextActive]}>Lista</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'map' && styles.toggleButtonActive]}
            onPress={() => setViewMode('map')}
          >
            <MaterialIcons name="map" size={18} color={viewMode === 'map' ? colors.primary : colors.textGray} />
            <Text style={[styles.toggleText, viewMode === 'map' && styles.toggleTextActive]}>Mapa</Text>
          </TouchableOpacity>
        </View>
        
        {/* Categories Section */}
        <Text style={styles.sectionTitle}>Categorías</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          <TouchableOpacity
            style={[styles.categoryChip, !selectedCategory && styles.categoryChipActive]}
            onPress={() => setSelectedCategory(null)}
          >
            <Text style={[styles.categoryChipText, !selectedCategory && styles.categoryChipTextActive]}>
              Todas
            </Text>
          </TouchableOpacity>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.nombre}
              style={[styles.categoryChip, selectedCategory === cat.nombre.toLowerCase() && styles.categoryChipActive]}
              onPress={() => setSelectedCategory(cat.nombre.toLowerCase())}
            >
              <Text style={[styles.categoryChipText, selectedCategory === cat.nombre.toLowerCase() && styles.categoryChipTextActive]}>
                {cat.nombre}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Filters Panel */}
      <View style={styles.filtersContainer}>
        <Text style={styles.filtersTitle}>Filtros</Text>
        
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Estado:</Text>
          <TouchableOpacity 
            style={styles.dropdown}
            onPress={() => {
              const nextIndex = statuses.findIndex(s => s.value === selectedStatus);
              const newIndex = (nextIndex + 1) % statuses.length;
              setSelectedStatus(statuses[newIndex].value);
            }}
          >
            <Text style={styles.dropdownText}>
              {statuses.find(s => s.value === selectedStatus)?.label || 'Todos'}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={20} color={colors.textGray} />
          </TouchableOpacity>
        </View>

        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Ordenar por:</Text>
          <TouchableOpacity 
            style={styles.dropdown}
            onPress={() => {
              const nextIndex = sortOptions.findIndex(s => s.value === sortBy);
              const newIndex = (nextIndex + 1) % sortOptions.length;
              setSortBy(sortOptions[newIndex].value);
            }}
          >
            <Text style={styles.dropdownText}>
              {sortOptions.find(s => s.value === sortBy)?.label || 'Fecha (más reciente)'}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={20} color={colors.textGray} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchSection}>
          <Text style={styles.searchTitle}>Buscar</Text>
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={20} color={colors.textGray} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar reportes..."
              placeholderTextColor={colors.textGray}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          
          <TouchableOpacity style={styles.clearButton} onPress={handleClearFilters}>
            <Text style={styles.clearButtonText}>Limpiar Filtros</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.resultsCounter}>
          Mostrando {filteredReports.length} de {filteredReports.length} reporte{filteredReports.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Content Area */}
      {viewMode === 'list' ? (
        <FlatList
          data={filteredReports}
          renderItem={({ item }) => (
            <ReportCard report={item} onPress={handleReportPress} />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.gridContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialIcons name="search-off" size={64} color={colors.textGray} />
              <Text style={styles.emptyText}>No se encontraron reportes</Text>
              <Text style={styles.emptySubtext}>
                Intenta ajustar los filtros o busca con otros términos
              </Text>
            </View>
          }
        />
      ) : (
        <View style={styles.mapContainer}>
          <LeafletMap
            reports={filteredReports}
            onLocationSelect={null}
            selectable={false}
          />
        </View>
      )}

      {/* FAB for Create Report */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateReport')}
        activeOpacity={0.8}
      >
        <MaterialIcons name="add" size={28} color={colors.textWhite} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  
  // Scroll Container
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  
  // Title Section
  titleSection: {
    backgroundColor: colors.backgroundWhite,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textDark,
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 14,
    color: colors.textGray,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
  },
  
  // Lista/Mapa Toggle
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundLight,
    borderRadius: 8,
    padding: 3,
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    gap: 6,
  },
  toggleButtonActive: {
    backgroundColor: colors.primary,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  toggleTextActive: {
    color: colors.textWhite,
  },
  
  // Categories Section
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 12,
  },
  categoriesScroll: {
    flexGrow: 0,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.backgroundLight,
    borderRadius: 4,
    marginRight: 8,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textDark,
  },
  categoryChipTextActive: {
    color: colors.textWhite,
  },
  
  // Filters Card
  filtersCard: {
    backgroundColor: colors.backgroundWhite,
    marginHorizontal: 20,
    marginVertical: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textDark,
    flex: 1,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
    minWidth: 140,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  dropdownText: {
    fontSize: 13,
    color: colors.textDark,
    flex: 1,
  },
  
  // Search Section
  searchSection: {
    marginTop: 8,
  },
  searchTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textDark,
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundLight,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textDark,
  },
  clearButton: {
    backgroundColor: colors.success,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  clearButtonText: {
    fontSize: 14,
    color: colors.textWhite,
    fontWeight: '600',
  },
  resultsCounter: {
    fontSize: 13,
    color: colors.textGray,
    textAlign: 'center',
  },
  
  // Reports Grid
  reportsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  reportCardWrapper: {
    width: '48%',
    marginBottom: 16,
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

  // Empty state
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    width: '100%',
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
    paddingTop: 16,
    paddingBottom: 20,
  },

  // FAB
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
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
