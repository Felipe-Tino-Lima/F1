const pilotos = [
  { nome: "Lewis Hamilton", cor: "vermelho", odds: 2 },
  { nome: "Max Verstappen", cor: "azul", odds: 2 },
  { nome: "Valtteri Bottas", cor: "prateado", odds: 2 },
  { nome: "Charles Leclerc", cor: "amarelo", odds: 2 },
  { nome: "Sergio Perez", cor: "laranja", odds: 2 }
];

let saldo = 100;
let apostas = []; 

function fazerAposta(piloto, valorAposta) {
  const aposta = { piloto, valorAposta };
  apostas.push(aposta);
  saldo -= valorAposta;
  atualizarSaldo(); 
  console.log(`Aposta feita em ${piloto.nome} no valor de ${valorAposta} unidades.`);
}

function simularCorrida() {
  const pista = document.getElementById('pista');
  const carros = pista.querySelectorAll('.carro');


  carros.forEach(carro => carro.remove());

 
  apostas = [];

  
  for (let i = 0; i < 5; i++) {
    const carro = document.createElement('div');
    carro.className = 'carro';
    carro.style.backgroundColor = pilotos[i].cor; 
    pista.appendChild(carro);
  }

  const novosCarros = pista.querySelectorAll('.carro');

  novosCarros.forEach((carro, index) => {
    carro.style.left = "-40px"; 
    setTimeout(() => {
      const randomDelay = Math.random() * 2000; 
      carro.style.transition = `left 5s ease-out ${randomDelay}ms`; 
      carro.style.left = "calc(100% - 40px)"; 
    }, 50);
  });

 
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
    const vencedor = pilotos[indexVencedor].nome; 
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

 
  atualizarSaldo();
}

function atualizarSaldo() {
  document.getElementById('saldo').textContent = `R$${saldo}`;
}

atualizarSaldo();
