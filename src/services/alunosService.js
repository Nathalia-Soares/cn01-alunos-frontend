import axios from 'axios';

// Configurar baseURL dependendo do ambiente
const getBaseURL = () => {
  // Sempre usar proxy local para evitar CORS
  return '/v1/api';
};

const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT) || 30000;

console.log('🔧 API Configuration:');
console.log('📡 Base URL:', getBaseURL());
console.log('⏱️ Timeout:', API_TIMEOUT + 'ms');
console.log('🌍 Environment:', process.env.REACT_APP_ENVIRONMENT || process.env.NODE_ENV || 'development');

// Configuração do axios
const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: API_TIMEOUT,
  withCredentials: false
});

// Interceptor para adicionar logs detalhados
api.interceptors.request.use(
  (config) => {
    console.log('🔍 Fazendo requisição:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`,
      headers: config.headers
    });
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros globais
api.interceptors.response.use(
  (response) => {
    console.log('✅ Resposta recebida:', {
      status: response.status,
      statusText: response.statusText,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('❌ Erro na API:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      headers: error.response?.headers
    });
    
    // Erro específico de CORS
    if (error.message.includes('CORS') || error.code === 'ERR_NETWORK') {
      throw new Error('Erro de conexão: Verifique se o servidor está funcionando.');
    }
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Timeout: A operação demorou muito para responder');
    }
    
    if (!error.response) {
      throw new Error('Erro de rede: Verifique sua conexão com a internet ou se a API está funcionando');
    }
    
    if (error.response.status >= 500) {
      throw new Error('Erro do servidor: Tente novamente mais tarde');
    }
    
    if (error.response.status === 404) {
      throw new Error('Recurso não encontrado');
    }
    
    if (error.response.status === 400) {
      throw new Error('Dados inválidos: Verifique as informações enviadas');
    }
    
    throw error;
  }
);

export const alunosService = {
  // GET - Listar todos os alunos
  listarTodos: async () => {
    try {
      console.log('🔍 Tentando carregar alunos via proxy...');
      const response = await api.get('/alunos');
      console.log('✅ Alunos carregados com sucesso:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Erro ao carregar alunos:', error);
      throw new Error(`Erro ao carregar alunos: ${error.message}`);
    }
  },

  // GET - Buscar aluno por ID
  buscarPorId: async (id) => {
    try {
      const response = await api.get(`/alunos/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao buscar aluno: ${error.message}`);
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
  },

  // Testar conexão
  testarConexao: async () => {
    try {
      console.log('🔍 Testando conexão...');
      const response = await api.get('/alunos', { timeout: 10000 });
      console.log('✅ Conexão OK:', response.status);
      return { 
        sucesso: true, 
        status: response.status, 
        baseURL: getBaseURL(),
        dados: response.data 
      };
    } catch (error) {
      console.error('❌ Erro na conexão:', error);
      return { 
        sucesso: false, 
        erro: error.message, 
        baseURL: getBaseURL() 
      };
    }
  }
};

export default alunosService;
