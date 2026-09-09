const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rota raiz (evita erro 404 ao testar o link)
app.get('/', (req, res) => {
  res.status(200).send({ message: "Servidor ativo e pronto!" });
});

app.post('/', (req, res) => {
  res.status(200).send({ message: "Sincronizado com sucesso!" });
});

// Rota /api/sync
app.all('/api/sync', (req, res) => {
  res.status(200).send({ message: "Sincronização realizada com sucesso!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
