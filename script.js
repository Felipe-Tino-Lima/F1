const pilotos = [
  { nome: "Lewis Hamilton", cor: "vermelho", odds: 2 },
  { nome: "Max Verstappen", cor: "azul", odds: 2 },
  { nome: "Valtteri Bottas", cor: "prateado", odds: 2 },
  { nome: "Charles Leclerc", cor: "amarelo", odds: 2 },
  { nome: "Sergio Perez", cor: "laranja", odds: 2 }
];

let saldo = 100;
let apostas = []; // Inicializa o array de apostas

function fazerAposta(piloto, valorAposta) {
  const aposta = { piloto, valorAposta };
  apostas.push(aposta);
  saldo -= valorAposta;
  atualizarSaldo(); // Atualiza o saldo após fazer a aposta
  console.log(`Aposta feita em ${piloto.nome} no valor de ${valorAposta} unidades.`);
}

function simularCorrida() {
  const pista = document.getElementById('pista');
  const carros = pista.querySelectorAll('.carro');

  // Remove os carros da pista
  carros.forEach(carro => carro.remove());

  // Limpa o array de apostas
  apostas = [];

  // Cria novos carros e inicia a simulação
  for (let i = 0; i < 5; i++) {
    const carro = document.createElement('div');
    carro.className = 'carro';
    carro.style.backgroundColor = pilotos[i].cor; // Define a cor do carro
    pista.appendChild(carro);
  }

  const novosCarros = pista.querySelectorAll('.carro');

  novosCarros.forEach((carro, index) => {
    carro.style.left = "-40px"; // Resetando a posição dos carros
    setTimeout(() => {
      const randomDelay = Math.random() * 2000; // Gera um atraso aleatório entre 0 e 2 segundos
      carro.style.transition = `left 5s ease-out ${randomDelay}ms`; // Define uma transição de movimento com atraso aleatório
      carro.style.left = "calc(100% - 40px)"; // Move até o final da pista
    }, 50);
  });

  // Verifica o vencedor após 5 segundos (tempo da animação)
  setTimeout(() => {
    let vencedorCarro;
    let maiorPosicao = -1;
    novosCarros.forEach((carro, index) => {
      const posicao = parseFloat(carro.style.left);
      if (posicao > maiorPosicao) {
        maiorPosicao = posicao;
        vencedorCarro = carro;
      }
    });

    const indexVencedor = Array.from(novosCarros).indexOf(vencedorCarro);
    const vencedor = pilotos[indexVencedor].nome; // Nome do piloto vencedor
    verificarResultado(vencedor);
  }, 5000);
}

function verificarResultado(vencedor) {
  apostas.forEach(aposta => {
    if (aposta.piloto.nome === vencedor) {
      const pagamento = aposta.valorAposta * aposta.piloto.odds;
      saldo += pagamento;
      console.log(`Parabéns! Você ganhou ${pagamento} unidades apostando em ${aposta.piloto.nome}.`);
    } else {
      console.log(`Você perdeu sua aposta em ${aposta.piloto.nome}.`);
    }
  });

  // Atualiza o saldo após as apostas
  atualizarSaldo();
}

function atualizarSaldo() {
  document.getElementById('saldo').textContent = `R$${saldo}`;
}

atualizarSaldo();
