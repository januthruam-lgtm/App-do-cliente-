const express = require('express');
const cors = require('cors');

const app = express();

// Libera requisições de qualquer origem (evita CORS)
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Responde com sucesso a QUALQUER rota e QUALQUER método (GET, POST, PUT, etc)
app.use((req, res) => {
  console.log(`[${new Date().toISOString()}] Requisição recebida em: ${req.originalUrl}`);
  return res.status(200).json({
    status: "sucesso",
    message: "Servidor ativo e sincronizado com sucesso!",
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
