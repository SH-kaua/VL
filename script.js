script.js
// Referências aos elementos HTML
const pontosAElement = document.getElementById('pontos-a');
const pontosBElement = document.getElementById('pontos-b');
const setsAElement = document.getElementById('sets-a');
const setsBElement = document.getElementById('sets-b');
const timeAContainer = document.getElementById('time-a');
const timeBContainer = document.getElementById('time-b');

// Variáveis de estado do jogo
let pontosTimeA = 0;
let pontosTimeB = 0;
let setsTimeA = 0;
let setsTimeB = 0;


/**
 * Adiciona a classe 'lider' ao time com mais pontos.
 */
function destacarLider() {
    timeAContainer.classList.remove('lider');
    timeBContainer.classList.remove('lider');

    if (pontosTimeA > pontosTimeB) {
        timeAContainer.classList.add('lider');
    } else if (pontosTimeB > pontosTimeA) {
        timeBContainer.classList.add('lider');
    }
    // Empate: Nenhum destaque
}

/**
 * Atualiza o placar no HTML e chama a função de destaque.
 */
function atualizarPlacar() {
    pontosAElement.textContent = pontosTimeA;
    pontosBElement.textContent = pontosTimeB;
    setsAElement.textContent = setsTimeA;
    setsBElement.textContent = setsTimeB;
    
    destacarLider();
}

/**
 * Verifica se as condições para o fim de um set foram atingidas.
 * Inclui lógica para Tie-Break (5º set).
 * @returns {boolean} - Verdadeiro se o set acabou.
 */
function verificarFimDeSet() {
    // É o 5º set se a soma for 4 (ex: 2x2)
    const isTieBreak = (setsTimeA + setsTimeB) === 4;
    const minPontos = isTieBreak ? 15 : 25; 
    const diferenca = Math.abs(pontosTimeA - pontosTimeB);

    // Vence se atingiu a pontuação mínima E tem 2 pontos de diferença
    if (pontosTimeA >= minPontos && diferenca >= 2) {
        return true; 
    }
    if (pontosTimeB >= minPontos && diferenca >= 2) {
        return true; 
    }
    return false;
}

/**
 * Encerra o set atual, atualiza o contador de sets e reinicia os pontos.
 */
function encerrarSet() {
    let vencedor = "";
    
    if (pontosTimeA > pontosTimeB) {
        setsTimeA++;
        vencedor = "TIME A";
    } else {
        setsTimeB++;
        vencedor = "TIME B";
    }

    // Verifica FIM DO JOGO (melhor de 5 sets)
    if (setsTimeA === 3 || setsTimeB === 3) {
        alert(`🏆 FIM DE JOGO! O ${vencedor} venceu a partida por ${setsTimeA} sets a ${setsTimeB}.`);
    } else {
         alert(`FIM DO SET! O ${vencedor} venceu. O placar atual de sets é ${setsTimeA} x ${setsTimeB}.`);
    }
   
    // Reinicia os pontos para o próximo set
    pontosTimeA = 0;
    pontosTimeB = 0;

    atualizarPlacar();
}

/**
 * Adiciona um ponto ao time especificado e verifica o fim do set.
 * @param {string} time - 'A' ou 'B'.
 */
function adicionarPonto(time) {
    if (time === 'A') {
        pontosTimeA++;
    } else if (time === 'B') {
        pontosTimeB++;
    }

    if (verificarFimDeSet()) {
        encerrarSet();
    } else {
        atualizarPlacar();
    }
}

/**
 * Remove um ponto do time especificado, garantindo que a pontuação não seja negativa.
 * @param {string} time - 'A' ou 'B'.
 */
function removerPonto(time) {
    if (time === 'A' && pontosTimeA > 0) {
        pontosTimeA--;
    } else if (time === 'B' && pontosTimeB > 0) {
        pontosTimeB--;
    }
    atualizarPlacar();
}

/**
 * Reinicia todas as variáveis de pontuação e sets.
 */
function resetarPlacar() {
    const confirmar = confirm("Tem certeza que deseja reiniciar o jogo?");
    if (confirmar) {
        pontosTimeA = 0;
        pontosTimeB = 0;
        setsTimeA = 0;
        setsTimeB = 0;
        atualizarPlacar();
        alert("Jogo reiniciado!");
    }
}

// Inicializa o placar ao carregar a página
document.addEventListener('DOMContentLoaded', atualizarPlacar);