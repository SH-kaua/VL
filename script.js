script.js
// Referências aos elementos HTML
const pontosAElement = document.getElementById('pontos-a');
const pontosBElement = document.getElementById('pontos-b');
const setsAElement = document.getElementById('sets-a');
const setsBElement = document.getElementById('sets-b');

// Variáveis de estado do jogo
let pontosTimeA = 0;
let pontosTimeB = 0;
let setsTimeA = 0;
let setsTimeB = 0;

/**
 * Atualiza o placar no HTML.
 */
function atualizarPlacar() {
    pontosAElement.textContent = pontosTimeA;
    pontosBElement.textContent = pontosTimeB;
    setsAElement.textContent = setsTimeA;
    setsBElement.textContent = setsTimeB;
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

    // Lógica para fechar um SET (Simplificada para 25 pontos e 2 de diferença)
    if (verificarFimDeSet()) {
        encerrarSet();
    } else {
        atualizarPlacar();
    }
}

/**
 * Verifica se as condições para o fim de um set foram atingidas.
 * @returns {boolean} - Verdadeiro se o set acabou.
 */
function verificarFimDeSet() {
    const minPontos = 25; // Pode ser 15 para o 5º set
    const diferenca = Math.abs(pontosTimeA - pontosTimeB);

    // Condição: Pontos >= minPontos E Diferença >= 2
    if (pontosTimeA >= minPontos && diferenca >= 2) {
        return true; // Time A venceu o set
    }
    if (pontosTimeB >= minPontos && diferenca >= 2) {
        return true; // Time B venceu o set
    }
    return false;
}

/**
 * Encerra o set atual, atualiza o contador de sets e reinicia os pontos.
 */
function encerrarSet() {
    let vencedor = "";
    
    // Define o vencedor do set
    if (pontosTimeA > pontosTimeB) {
        setsTimeA++;
        vencedor = "TIME A";
    } else {
        setsTimeB++;
        vencedor = "TIME B";
    }

    // Exibe a mensagem e reinicia a pontuação
    alert(`FIM DO SET! O ${vencedor} venceu. O placar atual de sets é ${setsTimeA} x ${setsTimeB}.`);
    
    // Reinicia os pontos para o próximo set
    pontosTimeA = 0;
    pontosTimeB = 0;

    // TODO: Adicionar lógica para verificar FIM DO JOGO (ex: 3 sets ganhos)

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