document.addEventListener('DOMContentLoaded', () => {
    const reels = document.querySelectorAll('.reels');
    const startButton = document.querySelector('.start-button');
    const stopButton = document.querySelector('.stop-button');
    const pointsDisplay = document.getElementById('points');
    const bankDisplay = document.getElementById('bank');

    // Fetch and setup slot machine
    let symbols = [];

    fetch("http://127.0.0.1:3000/symbols")
        .then(response => response.json())
        .then(fetchedSymbols => {
            symbols = fetchedSymbols;
            setupAndShuffleSlotMachine();
        })

})

function shuffleReels(reel) {
    for (let i = reel.children.length; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * i);
        reel.appendChild(reel.children[randomIndex]);
    }
}

// Call this function for each slot machine
const slotMachines = document.querySelectorAll('.slotMachine');
slotMachines.forEach(slotMachine => shuffleReels(slotMachine.querySelector('.reels')));
