
const readline = require('readline');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function determinarVencedor(jogador, computador) {
  if (jogador === computador) {
    return 'Empate!';
  }

  if (
    (jogador === 'pedra' && computador === 'tesoura') ||
    (jogador === 'tesoura' && computador === 'papel') ||
    (jogador === 'papel' && computador === 'pedra')
  ) {
    return 'Você venceu!';
  } else {
    return 'O computador venceu!';
  }
}


function escolherComputador() {
  const random = Math.random();
  
  if (random < 0.33) {
    return 'pedra';
  } else if (random < 0.66) {
    return 'papel';
  } else {
    return 'tesoura';
  }
}


function jogar(jogadorEscolha) {

  const escolhasValidas = ['pedra', 'papel', 'tesoura'];
  if (!escolhasValidas.includes(jogadorEscolha)) {
    console.log('Escolha inválida! Por favor, digite "pedra", "papel" ou "tesoura".');
    rl.close();  // Fecha a interface do readline
    return;
  }

  const computadorEscolha = escolherComputador();

  console.log(`Você escolheu: ${jogadorEscolha}`);
  console.log(`O computador escolheu: ${computadorEscolha}`);

  const resultado = determinarVencedor(jogadorEscolha, computadorEscolha);
  console.log(resultado);

  rl.close();
}


rl.question('Escolha entre "pedra", "papel" ou "tesoura": ', (escolhaJogador) => {
  jogar(escolhaJogador.toLowerCase());
});
