exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ mensagem: 'Função de salvar desativada temporariamente' })
  };
};