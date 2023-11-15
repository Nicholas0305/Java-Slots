document.addEventListener('DOMContentLoaded', () => {
    const reels = document.querySelectorAll('.reels')
    const startButton = document.getElementById('startButton')
    const stopButtons = document.querySelectorAll('.stop-button')
    const pointsDisplay = document.getElementById('points')
    const bankDisplay = document.getElementById('bank')

    // fetch symbols data
    fetch("http://localhost:3000/symbols")
        .then(resp => resp.json())
        .then(symbols => {
            addingEventListeners(symbols)
        })

    // function to add event listeners
    function addingEventListeners(symbols) {
        // click event for 'start' button
        startButton.addEventListener('click', () => {
            reels.forEach(reel => {
                beginSpin(reel)
            })
            stopButtons.forEach(button => {
                // enable all stop buttons
                button.disabled = false;
            })
            // disable the start button
            startButton.disabled = true;
        })

        // iterate through stop buttons to allow users to stop each one individually
        stopButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                stopSpin(reels[index], symbols)
            })
        })
    }

    // function to begin spin
    function beginSpin(reel) {
        reel.classList.add('reels-spinning')
    }

    // function to stop spin
    function stopSpin(reel, symbols) {
        reel.classList.remove('reels-spinning')
        reelShowsRandomSymbols(reel, symbols)
    }

    // function to randomize symbols after button press
    function reelShowsRandomSymbols(reel, symbols) {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)]
        // clear current content of reel
        reel.innerHTML = ''
        // create img element
        const image = document.createElement('img')
        image.src = randomSymbol.image
        image.alt = randomSymbol.name
        // append image to the reel
        reel.append(image)
    }
})