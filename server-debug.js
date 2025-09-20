const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

console.log('Iniciando servidor...');

// Middleware para parsing JSON
app.use(express.json());

// Configurar CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Proxy manual para a API
const API_BASE_URL = 'https://alunos-api.lemonmoss-6686543d.brazilsouth.azurecontainerapps.io/v1/api';

app.all('/v1/api/*', async (req, res) => {
  try {
    console.log(`📤 Proxy: ${req.method} ${req.path}`);
    
    const apiPath = req.path.replace('/v1/api', '');
    const targetUrl = `${API_BASE_URL}${apiPath}`;
    
    console.log(`🎯 Target URL: ${targetUrl}`);
    
    const response = await axios({
      method: req.method.toLowerCase(),
      url: targetUrl,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: req.body,
      timeout: 30000
    });
    
    console.log(`✅ Proxy Success: ${response.status}`);
    res.status(response.status).json(response.data);
    
  } catch (error) {
    console.error('❌ Proxy Error:', error.message);
    
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data:`, error.response.data);
      res.status(error.response.status).json(error.response.data || { error: error.message });
    } else {
      console.error('Network Error:', error.message);
      res.status(500).json({ error: 'Erro no proxy: ' + error.message });
    }
  }
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'build')));

// SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Error handling
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
  console.log(`📂 Servindo arquivos de: ${path.join(__dirname, 'build')}`);
  console.log(`🔄 Proxy configurado para: ${API_BASE_URL}`);
});