const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

// Define a pasta onde seus arquivos estáticos estão localizados
const publicPath = path.join(__dirname, 'public');

// Define o middleware para servir os arquivos estáticos
app.use(express.static(publicPath));

// Cria o servidor HTTP usando o Express
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

// Inicia o servidor
server.listen(PORT, function() {
  console.log(`Servidor rodando na porta ${PORT}`);
});
