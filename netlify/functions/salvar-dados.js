// netlify/functions/salvar-dados.js
const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  // Permitir apenas POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método não permitido' })
    };
  }

  try {
    // Pegar os dados do corpo da requisição
    const dados = JSON.parse(event.body);
    
    // Conectar ao store (banco de dados) da Netlify
    const store = getStore('queijaria-store');
    
    // Salvar os dados
    await store.set('dados', JSON.stringify(dados));
    
    return {
      statusCode: 200,
      body: JSON.stringify({ mensagem: 'Dados salvos com sucesso!' })
    };
  } catch (erro) {
    console.error('Erro ao salvar:', erro);
    return {
      statusCode: 500,
      body: JSON.stringify({ erro: 'Erro ao salvar dados' })
    };
  }
};