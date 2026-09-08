const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();

// Permite requisições de qualquer origem (inclusive Google AI Studio)
app.use(cors({ origin: '*' }));
app.use(express.json());

// Inicializa o Firebase Admin
admin.initializeApp({
  projectId: "marmitaria-deggust"
});

const db = admin.firestore();

// Rota de Teste de Status
app.get('/', (req, res) => {
  res.status(200).send('API Marmitaria Deggust Online!');
});

// Endpoint do Webhook
app.post('/api/sync', async (req, res) => {
  try {
    const dados = req.body;
    
    if (dados && Array.isArray(dados.pratos)) {
      for (const prato of dados.pratos) {
        await db.collection('cardapio').add({
          nome: prato.nome || 'Marmita Sem Nome',
          descricao: prato.descricao || '',
          preco: parseFloat(prato.preco) || 0,
          imagem: prato.imagem || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
          criadoEm: admin.firestore.FieldValue.serverTimestamp()
        });
      }
    }

    return res.status(200).json({ status: "sucesso", mensagem: "Cardápio sincronizado!" });
  } catch (error) {
    console.error("Erro na sincronização:", error);
    return res.status(500).json({ status: "erro", mensagem: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
