exports.handler = async () => {
  const dadosIniciais = {
    produtos: [
      {id: 1, nome: 'Cachaça litro', preco: 28.00, estoque: 0},
      {id: 2, nome: 'Doce de leite pedaço', preco: 5.00, estoque: 0},
      {id: 3, nome: 'Doce de leite pote', preco: 18.00, estoque: 0}
    ],
    vendas: [],
    compras: [],
    historicoEstoque: [],
    contadorId: 21
  };
  
  return {
    statusCode: 200,
    body: JSON.stringify(dadosIniciais)
  };
};