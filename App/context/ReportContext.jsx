import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import ApiService from '../services/ApiService'; // Descomentar cuando se integre la API

const ReportContext = createContext();

export const useReport = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error('useReport must be used within a ReportProvider');
  }
  return context;
};

export const ReportProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar reportes almacenados localmente al iniciar
  useEffect(() => {
    loadStoredReports();
  }, []);

  const loadStoredReports = async () => {
    try {
      setLoading(true);
      const storedReports = await AsyncStorage.getItem('reports');
      if (storedReports) {
        setReports(JSON.parse(storedReports));
        console.log('📋 Loaded stored reports:', JSON.parse(storedReports).length);
      }
    } catch (error) {
      console.error('❌ Error loading stored reports:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Crear un nuevo reporte
  const createReport = async (reportData) => {
    console.log('📝 Creating report:', reportData.titulo);

    try {
      setLoading(true);
      setError(null);

      // TODO: Descomentar cuando se integre la API
      // const response = await ApiService.createReport(reportData);

      // Por ahora, simulamos la creación con datos locales
      const newReport = {
        id: Date.now().toString(), // ID temporal
        ...reportData,
        estado: 'pendiente',
        fecha_creacion: new Date().toISOString(),
        fecha_actualizacion: new Date().toISOString(),
      };

      const updatedReports = [...reports, newReport];
      setReports(updatedReports);

      // Guardar en AsyncStorage
      await AsyncStorage.setItem('reports', JSON.stringify(updatedReports));

      console.log('✅ Report created successfully:', newReport.id);
      return { success: true, data: newReport };
    } catch (error) {
      console.error('❌ Create report error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Obtener todos los reportes
  const getReports = async (filters = {}) => {
    console.log('📋 Fetching reports with filters:', filters);

    try {
      setLoading(true);
      setError(null);

      // TODO: Descomentar cuando se integre la API
      // const response = await ApiService.getReports(filters);
      // setReports(response.data);

      // Por ahora, retornamos los reportes locales
      let filteredReports = [...reports];

      // Aplicar filtros si existen
      if (filters.categoria) {
        filteredReports = filteredReports.filter(
          (report) => report.categoria === filters.categoria
        );
      }
      if (filters.estado) {
        filteredReports = filteredReports.filter(
          (report) => report.estado === filters.estado
        );
      }
      if (filters.prioridad) {
        filteredReports = filteredReports.filter(
          (report) => report.prioridad === filters.prioridad
        );
      }

      console.log('✅ Fetched reports:', filteredReports.length);
      return { success: true, data: filteredReports };
    } catch (error) {
      console.error('❌ Get reports error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Obtener un reporte por ID
  const getReportById = async (reportId) => {
    console.log('🔍 Fetching report by ID:', reportId);

    try {
      setLoading(true);
      setError(null);

      // TODO: Descomentar cuando se integre la API
      // const response = await ApiService.getReportById(reportId);
      // return { success: true, data: response.data };

      // Por ahora, buscamos en los reportes locales
      const report = reports.find((r) => r.id === reportId);

      if (report) {
        console.log('✅ Report found:', report.titulo);
        return { success: true, data: report };
      } else {
        console.log('❌ Report not found');
        return { success: false, error: 'Reporte no encontrado' };
      }
    } catch (error) {
      console.error('❌ Get report error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Actualizar un reporte
  const updateReport = async (reportId, updateData) => {
    console.log('✏️ Updating report:', reportId);

    try {
      setLoading(true);
      setError(null);

      // TODO: Descomentar cuando se integre la API
      // const response = await ApiService.updateReport(reportId, updateData);

      // Por ahora, actualizamos localmente
      const updatedReports = reports.map((report) =>
        report.id === reportId
          ? { ...report, ...updateData, fecha_actualizacion: new Date().toISOString() }
          : report
      );

      setReports(updatedReports);
      await AsyncStorage.setItem('reports', JSON.stringify(updatedReports));

      console.log('✅ Report updated successfully');
      return { success: true, data: updatedReports.find((r) => r.id === reportId) };
    } catch (error) {
      console.error('❌ Update report error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un reporte
  const deleteReport = async (reportId) => {
    console.log('🗑️ Deleting report:', reportId);

    try {
      setLoading(true);
      setError(null);

      // TODO: Descomentar cuando se integre la API
      // await ApiService.deleteReport(reportId);

      // Por ahora, eliminamos localmente
      const updatedReports = reports.filter((report) => report.id !== reportId);
      setReports(updatedReports);
      await AsyncStorage.setItem('reports', JSON.stringify(updatedReports));

      console.log('✅ Report deleted successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ Delete report error:', error);
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Limpiar error
  const clearError = () => {
    setError(null);
  };

  const value = {
    reports,
    loading,
    error,
    createReport,
    getReports,
    getReportById,
    updateReport,
    deleteReport,
    clearError,
  };

  return (
    <ReportContext.Provider value={value}>
      {children}
    </ReportContext.Provider>
  );
};
