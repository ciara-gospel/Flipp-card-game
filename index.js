const container = document.getElementById('container')
const resetButton = document.getElementById('resetButton')
const cards = Array.from(document.querySelectorAll('.card'))
const gameFeedback = document.getElementById('congratilation')
let flippedCards = []
let matchedpairs = 0

function shuffleCards() {
    cards.forEach(card => {
        const randomPo = Math.floor(Math.random() * cards.length);
        card.style.order = randomPo
        card.classList.remove('flipped', 'matched')
    })
    matchedpairs = 0
}

function flipcard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped')
        flippedCards.push(this)

        if(flippedCards.length === 2) {
            setTimeout(checkMatch, 500)
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards
    const isMatch = card1.dataset.image === card2.dataset.image

    if (isMatch) {
        card1.classList.add('matched');
        card2.classList.add('matched')
        matchedpairs++

        if(matchedpairs === cards.length / 2) {
             setTimeout(() =>  gameFeedback.textContent = 'Congratilation🎊 you won the game🥳')
        }
    }else {
        card1.classList.remove('flipped')
        card2.classList.remove('flipped')
    }

    flippedCards = []
}

cards.forEach(card => card.addEventListener('click', flipcard))
resetButton.addEventListener('click', () =>{
    gameFeedback.textContent = ''
})
resetButton.addEventListener('click', shuffleCards)
shuffleCards()