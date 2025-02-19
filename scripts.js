const icons = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
let cards = [...icons, ...icons];
let flippedCards = [];
let moveHistory = [];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    cards = shuffle(cards);
    const gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";
    cards.forEach((icon, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.icon = icon;
        card.dataset.index = index;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (this.classList.contains("flipped") || flippedCards.length === 2) return;
    
    this.textContent = this.dataset.icon;
    this.classList.add("flipped");
    flippedCards.push(this);
    
    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    let [card1, card2] = flippedCards;
    if (card1.dataset.icon === card2.dataset.icon) {
        moveHistory.push({ match: card1.dataset.icon, indices: [card1.dataset.index, card2.dataset.index] });
        flippedCards = [];
    } else {
        setTimeout(() => {
            card1.textContent = "";
            card2.textContent = "";
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
        }, 1000);
    }
}

function predictMove() {
    let predictions = {};
    moveHistory.forEach(move => {
        move.indices.forEach(index => {
            predictions[index] = move.match;
        });
    });
    console.log("Predicted Moves:", predictions);
}

createBoard();
setInterval(predictMove, 5000);
