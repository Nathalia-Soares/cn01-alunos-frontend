import axios from 'axios';

// Em produção usar URL completa, em desenvolvimento usar proxy
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.REACT_APP_API_URL || 'https://alunos-backend-e4ewatadadfjbphw.brazilsouth-01.azurewebsites.net/v1/api'
  : '/v1/api';
const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT) || 30000;

console.log('🔧 API Configuration:');
console.log('📡 Base URL:', API_BASE_URL);
console.log('⏱️ Timeout:', API_TIMEOUT + 'ms');
console.log('🌍 Environment:', process.env.REACT_APP_ENVIRONMENT || process.env.NODE_ENV || 'development');

// Configuração do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: API_TIMEOUT,
  withCredentials: false,
  // Configurações específicas para CORS
  crossDomain: true
});

// Interceptor para tratamento de erros globais
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na API:', error);
    
    if (error.response) {
      // Erro de resposta do servidor (4xx, 5xx)
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      const message = error.response.data?.message || `Erro ${error.response.status}`;
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Erro de rede/conexão
      console.error('Request error:', error.request);
      return Promise.reject(new Error('Erro de conexão com o servidor. Verifique sua internet e se a API está funcionando.'));
    } else {
      // Outros erros
      console.error('Error:', error.message);
      return Promise.reject(new Error(error.message));
    }
  }
);

export const alunosService = {
  // Método para testar conectividade
  testarConexao: async () => {
    try {
      console.log('Testando conexão com:', API_BASE_URL);
      const response = await api.get('/alunos', { timeout: 5000 });
      console.log('Conexão OK - Status:', response.status);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Erro na conexão:', error.message);
      return { success: false, error: error.message };
    }
  },

  // GET - Listar todos os alunos
  listarTodos: async () => {
    try {
      const response = await api.get('/alunos');
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao buscar alunos: ${error.message}`);
    }
  },

  // GET - Buscar aluno por ID
  buscarPorId: async (id) => {
    try {
      const response = await api.get(`/alunos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao buscar aluno por ID: ${error.message}`);
    }
  },

  // GET - Buscar aluno por RA
  buscarPorRa: async (ra) => {
    try {
      const response = await api.get(`/alunos/ra/${ra}`);
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao buscar aluno por RA: ${error.message}`);
    }
  },

  // POST - Criar novo aluno
  criar: async (aluno) => {
    try {
      const response = await api.post('/alunos', aluno);
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao criar aluno: ${error.message}`);
    }
  },

  // PUT - Atualizar aluno
  atualizar: async (id, aluno) => {
    try {
      const response = await api.put(`/alunos/${id}`, aluno);
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao atualizar aluno: ${error.message}`);
    }
  },

  // DELETE - Excluir aluno
  excluir: async (id) => {
    try {
      const response = await api.delete(`/alunos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao excluir aluno: ${error.message}`);
    }
  }
};

export default alunosService;