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
        spinReels()
    })
// Need a function
function spinReels([...fetchedSymbols]) {

}
})