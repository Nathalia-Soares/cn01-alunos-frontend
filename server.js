const express = require('express');
const path = require('path');
const app = express();

// Servir arquivos estáticos da pasta build
app.use(express.static(path.join(__dirname, 'build')));

// Para todas as rotas que não são arquivos estáticos, retornar index.html
// Isso permite que o React Router funcione corretamente
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Usar a porta fornecida pelo Azure ou 8080 como fallback
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
  console.log(`📂 Servindo arquivos de: ${path.join(__dirname, 'build')}`);
});