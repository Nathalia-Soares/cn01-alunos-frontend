// Teste direto da API no console do navegador
// Cole este código no DevTools (F12 > Console) para testar

const testarAPI = async () => {
  try {
    console.log('🧪 Testando conectividade com API...');
    
    const response = await fetch('https://alunos-api.lemonmoss-6686543d.brazilsouth.azurecontainerapps.io/v1/api/alunos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      mode: 'cors'
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API funcionando!', data);
      console.log('📊 Total de alunos:', data.length);
      return data;
    } else {
      console.error('❌ Erro HTTP:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('❌ Erro de rede/CORS:', error);
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      console.error('🔴 Provável erro de CORS - a API não permite requisições do browser');
    }
  }
};

// Executar o teste
testarAPI();