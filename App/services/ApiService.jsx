const API_BASE_URL = 'https://backend-voz-urbana.onrender.com';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    console.log('🚀 API Request:', {
      url,
      method: config.method || 'GET',
      headers: config.headers,
      body: config.body
    });

    try {
      const response = await fetch(url, config);
      
      console.log('📡 API Response Status:', response.status);
      
    
      const responseText = await response.text();
      console.log('📄 Raw Response:', responseText.substring(0, 300));
      

      if (responseText.includes('<html>') || responseText.includes('<!DOCTYPE')) {
        throw new Error(`Endpoint no encontrado (404) o error del servidor. Status: ${response.status}`);
      }
      

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ JSON Parse Error:', parseError);
        throw new Error(`Error al parsear JSON: ${parseError.message}`);
      }
      
      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
      }
      
      console.log('✅ Parsed Data:', data);
      return data;
    } catch (error) {
      console.error('❌ API Error:', error);
      
  
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Error de conexión. Verifica tu internet o que la API esté funcionando.');
      }
      
      throw error;
    }
  }

 // Auth endpoints
  async login(email, password) {
    return this.makeRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }
  // Register endpoint
  async register(userData) {
    
    const apiData = {
      nombre: userData.name, 
      email: userData.email,
      password: userData.password, 
    };

    return this.makeRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(apiData),
    });
  }


  async testConnection() {
    try {
      return await this.makeRequest('/api/test');
    } catch (error) {
      console.error('Connection test failed:', error);
      throw error;
    }
  }

  // Reports endpoints
  async getReports() {
    return this.makeRequest('/api/reports');
  }

  async createReport(reportData, token) {
    return this.makeRequest('/api/reports', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(reportData),
    });
  }

  async getReportById(id) {
    return this.makeRequest(`/api/reports/${id}`);
  }

  // Categories endpoints
  async getCategories() {
    return this.makeRequest('/api/categorias');
  }

  // Comments endpoints
  async getComments(reportId) {
    return this.makeRequest(`/api/comentarios/reporte/${reportId}`);
  }

  async createComment(commentData, token) {
    return this.makeRequest('/api/comentarios', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(commentData),
    });
  }

  // Votes endpoints
  async voteReport(reportId, voteData, token) {
    return this.makeRequest(`/api/votos/reporte/${reportId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(voteData),
    });
  }
}

export default new ApiService();