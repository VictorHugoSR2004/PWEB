let filmes = [];

window.onload = function () {

  const filmesSalvos = localStorage.getItem('filmes');
  filmes = filmesSalvos ? JSON.parse(filmesSalvos) : [];
  

  if (filmes.length === 0) {
    filmes = []; 
    salvarNoLocalStorage();
  }

  mostrarTela('listar');
};

function salvarNoLocalStorage() {
  localStorage.setItem('filmes', JSON.stringify(filmes));
}

function mostrarTela(tela) {
  const main = document.getElementById('conteudo-principal');
  if (tela === 'listar') {
    main.innerHTML = `
      <h2>Lista de Filmes</h2>
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
        <input type="text" id="inputBusca" placeholder="Buscar filmes" onkeyup="atualizarListaFilmes()" style="flex: 1;">
        <button onclick="document.getElementById('inputBusca').value=''; atualizarListaFilmes();">X</button>
      </div>
      <div id="listaFilmes" style="display: flex; flex-wrap: wrap; gap: 20px;"></div>
    `;
    atualizarListaFilmes();
  } else if (tela === 'cadastrar') {
    main.innerHTML = gerarFormularioCadastro();
  }
}

function atualizarListaFilmes() {
  const termo = document.getElementById('inputBusca').value.toLowerCase();
  const lista = document.getElementById('listaFilmes');

  let html = '';
  filmes.forEach((filme, index) => {
    if (filme.titulo.toLowerCase().includes(termo)) {
      html += `
        <div style="width: 200px;">
          <div style="width: 200px; height: 300px; overflow: hidden; border: 1px solid #ccc;">
            <img src="${filme.imagem || 'img/erro.png'}" 
                 alt="${filme.titulo}"
                 style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;"
                 onerror="this.src='img/erro.png'"
                 onclick="mostrarDetalhesFilme(${index})">
          </div>
          <div style="text-align: center; margin-top: 5px;"><strong>${filme.titulo}</strong></div>
          <div style="display: flex; justify-content: space-between; margin-top: 5px;">
            <button onclick="editarFilme(${index}, event)" style="width: 48%; padding: 5px; font-size: 12px;">Editar</button>
            <button onclick="excluirFilme(${index}, event)" style="width: 48%; padding: 5px; font-size: 12px;">Excluir</button>
          </div>
        </div>
      `;
    }
  });
  lista.innerHTML = html;
}

function mostrarDetalhesFilme(index) {
  const filme = filmes[index];
  alert(`Título: ${filme.titulo}\nDiretor: ${filme.diretor}\nAno: ${filme.ano}\nGênero: ${filme.genero}\nDuração: ${filme.duracao} min\nElenco: ${filme.elenco}\nClassificação: ${filme.classificacao}\nSinopse: ${filme.sinopse}\nNota: ${filme.notaUsuario}\nData: ${filme.dataAdicao}`);
}

function gerarFormularioCadastro() {
  return `
    <h2>Cadastrar Filme</h2>
    <form id="formCadastro" onsubmit="salvarFilme(event)">
      <input type="text" placeholder="Título" id="titulo" required style="width: 100%; padding: 8px; margin: 5px 0 10px; box-sizing: border-box;">
      <input type="text" placeholder="Diretor" id="diretor" required style="width: 100%; padding: 8px; margin: 5px 0 10px; box-sizing: border-box;">
      <input type="number" placeholder="Ano" id="ano" required style="width: 100%; padding: 8px; margin: 5px 0 10px; box-sizing: border-box;">
      <input type="text" placeholder="Gênero" id="genero" required style="width: 100%; padding: 8px; margin: 5px 0 10px; box-sizing: border-box;">
      <input type="number" placeholder="Duração (min)" id="duracao" required style="width: 100%; padding: 8px; margin: 5px 0 10px; box-sizing: border-box;">
      <input type="text" placeholder="Elenco" id="elenco" required style="width: 100%; padding: 8px; margin: 5px 0 10px; box-sizing: border-box;">
      <input type="text" placeholder="Classificação" id="classificacao" required style="width: 100%; padding: 8px; margin: 5px 0 10px; box-sizing: border-box;">
      <input type="text" placeholder="Sinopse" id="sinopse" required style="width: 100%; padding: 8px; margin: 5px 0 10px; box-sizing: border-box;">
      <input type="number" step="0.1" placeholder="Nota do usuário" id="notaUsuario" required style="width: 100%; padding: 8px; margin: 5px 0 10px; box-sizing: border-box;">
      <input type="url" placeholder="URL da imagem (opcional)" id="imagem" style="width: 100%; padding: 8px; margin: 5px 0 10px; box-sizing: border-box;">
      <button type="submit" style="margin-top: 10px;">Salvar</button>
      <button type="button" onclick="limparCamposCadastro()" style="margin-top: 10px;">Limpar</button>
    </form>
  `;
}

function limparCamposCadastro() {
  document.getElementById('formCadastro').reset();
}

function salvarFilme(event) {
  event.preventDefault();
  
  const novoFilme = {
    id: filmes.length > 0 ? Math.max(...filmes.map(f => f.id)) + 1 : 1,
    titulo: document.getElementById('titulo').value.trim(),
    diretor: document.getElementById('diretor').value.trim(),
    ano: parseInt(document.getElementById('ano').value),
    genero: document.getElementById('genero').value.trim(),
    duracao: parseInt(document.getElementById('duracao').value),
    elenco: document.getElementById('elenco').value.trim(),
    classificacao: document.getElementById('classificacao').value.trim(),
    sinopse: document.getElementById('sinopse').value.trim(),
    notaUsuario: parseFloat(document.getElementById('notaUsuario').value),
    imagem: document.getElementById('imagem').value.trim(),
    dataAdicao: new Date().toLocaleDateString('pt-BR'),
    assistido: false
  };

  filmes.push(novoFilme);
  salvarNoLocalStorage();
  alert("Filme salvo com sucesso!");
  mostrarTela('listar');
}

function editarFilme(index, event) {
  event.stopPropagation();
  const filme = filmes[index];
  
  filmes.splice(index, 1);
  salvarNoLocalStorage();
  
  mostrarTela('cadastrar');
  
  setTimeout(() => {
    document.getElementById('titulo').value = filme.titulo;
    document.getElementById('diretor').value = filme.diretor;
    document.getElementById('ano').value = filme.ano;
    document.getElementById('genero').value = filme.genero;
    document.getElementById('duracao').value = filme.duracao;
    document.getElementById('elenco').value = filme.elenco;
    document.getElementById('classificacao').value = filme.classificacao;
    document.getElementById('sinopse').value = filme.sinopse;
    document.getElementById('notaUsuario').value = filme.notaUsuario;
    document.getElementById('imagem').value = filme.imagem || '';
  }, 0);
}

function excluirFilme(index, event) {
  event.stopPropagation();
  if (confirm(`Tem certeza que deseja excluir "${filmes[index].titulo}"?`)) {
    filmes.splice(index, 1);
    salvarNoLocalStorage();
    atualizarListaFilmes();
  }
}