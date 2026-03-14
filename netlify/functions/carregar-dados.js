// netlify/functions/carregar-dados.js
const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  try {
    // Conectar ao store
    const store = getStore('queijaria-store');
    
    // Tentar carregar os dados
    const dadosString = await store.get('dados');
    
    if (dadosString) {
      // Se existir dados, retorna eles
      return {
        statusCode: 200,
        body: dadosString
      };
    } else {
      // Se não existir, retorna dados iniciais
      const dadosIniciais = {
        produtos: [
          {id: 1, nome: 'Cachaça litro', preco: 28.00, estoque: 0},
          {id: 2, nome: 'Doce de leite pedaço', preco: 5.00, estoque: 0},
          {id: 3, nome: 'Doce de leite pote', preco: 18.00, estoque: 0},
          {id: 4, nome: 'Doce de pote fruta', preco: 18.00, estoque: 0},
          {id: 5, nome: 'Geleia', preco: 20.00, estoque: 0},
          {id: 6, nome: 'Goiabada', preco: 20.00, estoque: 0},
          {id: 7, nome: 'Linguiça', preco: 25.00, estoque: 0},
          {id: 8, nome: 'Manteiga pequena', preco: 12.00, estoque: 0},
          {id: 9, nome: 'Parmesão capa preta', preco: 45.00, estoque: 0},
          {id: 10, nome: 'Queijo 4 cores', preco: 45.00, estoque: 0},
          {id: 11, nome: 'Queijo do reino', preco: 45.00, estoque: 0},
          {id: 12, nome: 'Queijo minas frescal', preco: 28.00, estoque: 0},
          {id: 13, nome: 'Queijo minas padrão', preco: 40.00, estoque: 0},
          {id: 14, nome: 'Queijo mussarela temperado', preco: 35.00, estoque: 0},
          {id: 15, nome: 'Queijo mussarelinha', preco: 32.00, estoque: 0},
          {id: 16, nome: 'Queijo nozinho', preco: 36.00, estoque: 0},
          {id: 17, nome: 'Queijo parmesão', preco: 45.00, estoque: 0},
          {id: 18, nome: 'Queijo provolone temperado', preco: 37.00, estoque: 0},
          {id: 19, nome: 'Requeijão', preco: 18.00, estoque: 0},
          {id: 20, nome: 'Queijo Prato', preco: 45.00, estoque: 0}
        ],
        compras: [],
        vendas: [],
        historicoEstoque: [],
        contadorId: 21
      };
      
      return {
        statusCode: 200,
        body: JSON.stringify(dadosIniciais)
      };
    }
  } catch (erro) {
    console.error('Erro ao carregar:', erro);
    return {
      statusCode: 500,
      body: JSON.stringify({ erro: 'Erro ao carregar dados' })
    };
  }
};