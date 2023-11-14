// Grab elements
let slotMachineScreen = document.getElementById("slot-machine-screen");
let reel = document.getElementsByClassName("reel");
let reels = document.getElementsByClassName("reels")
let startButton = document.getElementsByClassName("start-button");
let stopButton = document.getElementsByClassName("stop-button");

// Fisher-Yates(Knuth) Shuffle
// Setup function 
function setupAndShuffleSlotMachine(symbols) {
// Shuffle symbols for each reel
// Using spread operator to clone the array
let shuffledSymbols = shuffle([...symbols]);
    
// Have 3 symbols and want to randomize
for (let i = 0; i < reels.length; i++) {
    // Clear current reel
    reels[i].innerHTML = '';
        
// Add shuffled symbols to the reel
for (let j = 0; j < 3; j++) { // Assuming 3 symbols per reel
    let symbolIndex = Math.floor(Math.random() * shuffledSymbols.length);
    let symbol = shuffledSymbols[symbolIndex];
    reels[i].innerHTML += `<li class="reel"><img src="${symbol.image}" alt="${symbol.name}"></li>`;
        }
    }
}
// fetch
fetch("http://127.0.0.1:3000/symbols")
.then(res => res.json())
.then(symbols => {
    setupAndShuffleSlotMachine(symbols)
})