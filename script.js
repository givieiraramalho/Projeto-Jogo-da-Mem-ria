const cards = document.querySelectorAll(".card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        secondCard = this;
        checkForMatch();
    }
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        disableCards();
        matchedPairs++;
        if (matchedPairs === cards.length / 2) {
            setTimeout(() => {
                alert("Parabéns! Você venceu o jogo!");
                resetGame(); // Chama a função para resetar e recomeçar
            }, 500);
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 1200);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetGame() {
    // 1. Remove a classe 'flip' de todos os cards
    cards.forEach(card => {
        card.classList.remove("flip");
        card.addEventListener("click", flipCard); // Adiciona o evento de clique de volta
    });

    // 2. Embaralha as cartas para um novo jogo
    shuffle();

    // 3. Reseta o contador de pares
    matchedPairs = 0;

    // 4. Garante que o tabuleiro está limpo para um novo jogo
    resetBoard();
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener("click", flipCard));