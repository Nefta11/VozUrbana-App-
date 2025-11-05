import { useState, useEffect } from 'react';

// Hook personalizado para manejar reportes
export const useReports = (filters = {}) => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Categorías predefinidas
  const defaultCategories = [
    {
      id: 1,
      nombre: 'Saneamiento',
      descripcion: 'Agua potable, drenaje y alcantarillado',
      icono: 'Droplets',
    },
    {
      id: 2,
      nombre: 'Infraestructura',
      descripcion: 'Calles, banquetas y vialidades',
      icono: 'Construction',
    },
    {
      id: 3,
      nombre: 'Salud Pública',
      descripcion: 'Servicios médicos y sanitarios',
      icono: 'Heart',
    },
    {
      id: 4,
      nombre: 'Seguridad',
      descripcion: 'Iluminación y vigilancia',
      icono: 'Shield',
    },
    {
      id: 5,
      nombre: 'Medio Ambiente',
      descripcion: 'Áreas verdes y reciclaje',
      icono: 'Leaf',
    },
    {
      id: 6,
      nombre: 'Servicios Públicos',
      descripcion: 'Electricidad y alumbrado',
      icono: 'Zap',
    },
    {
      id: 7,
      nombre: 'Transporte',
      descripcion: 'Transporte público y movilidad',
      icono: 'Bus',
    },
    {
      id: 8,
      nombre: 'Residuos',
      descripcion: 'Recolección de basura',
      icono: 'Trash2',
    },
  ];

  // Datos de ejemplo (mock data)
  const mockReports = [
    {
      id: 1,
      titulo: 'Fuga de agua en calle principal',
      descripcion:
        'Se presenta una fuga considerable de agua potable que lleva más de 3 días sin atención. El agua se está desperdiciando y generando problemas de tránsito.',
      categoria: 'saneamiento',
      estado: 'nuevo',
      prioridad: 'alta',
      ubicacion: 'Av. Juárez #123, Colonia Centro',
      latitud: 20.2745,
      longitud: -97.9557,
      imagen: null,
      fecha_creacion: '2024-11-01T10:30:00Z',
      votos_positivos: 45,
      votos_negativos: 2,
      comentarios: [],
    },
    {
      id: 2,
      titulo: 'Baches en avenida principal',
      descripcion:
        'Múltiples baches de gran tamaño están afectando el tránsito vehicular y causando daños a los automóviles.',
      categoria: 'infraestructura',
      estado: 'en_proceso',
      prioridad: 'alta',
      ubicacion: 'Av. Revolución #456',
      latitud: 20.2755,
      longitud: -97.9567,
      imagen: null,
      fecha_creacion: '2024-10-28T14:20:00Z',
      votos_positivos: 78,
      votos_negativos: 5,
      comentarios: [],
    },
    {
      id: 3,
      titulo: 'Acumulación de basura en parque',
      descripcion:
        'El parque municipal presenta acumulación de basura desde hace una semana, generando malos olores y fauna nociva.',
      categoria: 'medio_ambiente',
      estado: 'nuevo',
      prioridad: 'media',
      ubicacion: 'Parque Central',
      latitud: 20.2735,
      longitud: -97.9547,
      imagen: null,
      fecha_creacion: '2024-10-30T09:15:00Z',
      votos_positivos: 32,
      votos_negativos: 1,
      comentarios: [],
    },
    {
      id: 4,
      titulo: 'Semáforo descompuesto',
      descripcion:
        'El semáforo del cruce lleva 2 días sin funcionar, causando problemas de tránsito y riesgo de accidentes.',
      categoria: 'seguridad',
      estado: 'en_proceso',
      prioridad: 'alta',
      ubicacion: 'Cruce Av. Hidalgo y Morelos',
      latitud: 20.2765,
      longitud: -97.9577,
      imagen: null,
      fecha_creacion: '2024-10-29T16:45:00Z',
      votos_positivos: 56,
      votos_negativos: 3,
      comentarios: [],
    },
    {
      id: 5,
      titulo: 'Luminaria apagada',
      descripcion:
        'La luminaria de la cuadra lleva más de un mes sin funcionar, dejando la zona muy oscura por las noches.',
      categoria: 'servicios_publicos',
      estado: 'resuelto',
      prioridad: 'media',
      ubicacion: 'Calle Zaragoza #789',
      latitud: 20.2725,
      longitud: -97.9537,
      imagen: null,
      fecha_creacion: '2024-10-15T11:30:00Z',
      votos_positivos: 23,
      votos_negativos: 0,
      comentarios: [],
    },
  ];

  // Cargar reportes
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Simular llamada a API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // TODO: Reemplazar con llamada real a la API
        // const response = await fetch('API_URL/reports');
        // const data = await response.json();

        setReports(mockReports);
        setCategories(defaultCategories);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...reports];

    // Filtrar por categoría
    if (filters.category) {
      filtered = filtered.filter(
        (report) =>
          report.categoria.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Filtrar por estado
    if (filters.status) {
      filtered = filtered.filter(
        (report) => report.estado === filters.status
      );
    }

    // Filtrar por prioridad
    if (filters.priority) {
      filtered = filtered.filter(
        (report) => report.prioridad === filters.priority
      );
    }

    // Filtrar por búsqueda de texto
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (report) =>
          report.titulo.toLowerCase().includes(searchLower) ||
          report.descripcion.toLowerCase().includes(searchLower) ||
          report.ubicacion.toLowerCase().includes(searchLower)
      );
    }

    // Ordenar
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'newest':
          filtered.sort(
            (a, b) =>
              new Date(b.fecha_creacion) - new Date(a.fecha_creacion)
          );
          break;
        case 'oldest':
          filtered.sort(
            (a, b) =>
              new Date(a.fecha_creacion) - new Date(b.fecha_creacion)
          );
          break;
        case 'most_voted':
          filtered.sort(
            (a, b) =>
              b.votos_positivos - b.votos_negativos -
              (a.votos_positivos - a.votos_negativos)
          );
          break;
        default:
          break;
      }
    }

    setFilteredReports(filtered);
  }, [reports, filters]);

  // Función para obtener un reporte por ID
  const getReportById = (id) => {
    return reports.find((report) => report.id === id);
  };

  // Función para agregar un nuevo reporte
  const addReport = async (newReport) => {
    try {
      // TODO: Llamada a la API para crear el reporte
      // const response = await fetch('API_URL/reports', {
      //   method: 'POST',
      //   body: JSON.stringify(newReport),
      // });

      // Simular creación
      const report = {
        ...newReport,
        id: reports.length + 1,
        fecha_creacion: new Date().toISOString(),
        votos_positivos: 0,
        votos_negativos: 0,
        comentarios: [],
        estado: 'nuevo',
      };

      setReports((prev) => [report, ...prev]);
      return { success: true, report };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Función para actualizar un reporte
  const updateReport = async (id, updates) => {
    try {
      // TODO: Llamada a la API para actualizar
      setReports((prev) =>
        prev.map((report) =>
          report.id === id ? { ...report, ...updates } : report
        )
      );
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Función para eliminar un reporte
  const deleteReport = async (id) => {
    try {
      // TODO: Llamada a la API para eliminar
      setReports((prev) => prev.filter((report) => report.id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    reports,
    filteredReports,
    categories,
    isLoading,
    error,
    getReportById,
    addReport,
    updateReport,
    deleteReport,
  };
};

export default useReports;
