document.addEventListener('DOMContentLoaded', () => {
    //Global Variables
    const reels = document.querySelectorAll('.reels');
    const startButton = document.querySelector('.start-button');
    const stopButton1 = document.getElementById('stopButton1');
    const stopButton2 = document.getElementById('stopButton2');
    const stopButton3 = document.getElementById('stopButton3');
    const pointsDisplay = document.getElementById('points');
    const bankDisplay = document.getElementById('bank');
    const reelImg1 = document.getElementById('reelImg1')
    const reelImg2 = document.getElementById('reelImg2')
    const reelImg3 = document.getElementById('reelImg3')
    const form = document.getElementById('inputBucks')
    // add player points
    let playerPoints = 0
    // render points
    function updatePointsDisplay() {
        pointsDisplay.textContent = `Points: ${playerPoints}`
    }
    //add money to bank balance
    let playerBank = 1000
    // set cost of each spin
    const costPerSpin = 50
    // update bank display
    function updateBankDisplay() {
        form.addEventListener('submit', (e) => {
            playerBank += parseInt(e.target.input.value)
            e.preventDefault();
            console.log('submission')
            console.log(e.target.input.value)
            bankDisplay.textContent = `JavaBucks: ${playerBank}`
        })


        bankDisplay.textContent = `JavaBucks: ${playerBank}`

    }
    updateBankDisplay()
    // fetch array of objects
    fetch("http://127.0.0.1:3000/symbols")
        .then(response => response.json())
        .then(symbols => {
            buttons(symbols)
        })
        let stoppedReels = 0

        function checkReelsStopped() {
            if (stoppedReels === 3) {
                reactivatePlayButton()
            }
        }
    //Contains button functionality for start and stop
    function buttons(symbols) {
        startButton.addEventListener('click', () => {
            // every time button is pressed, takes away money
            if (playerBank >= costPerSpin) {
                playerBank -= costPerSpin
                updateBankDisplay()
                startButton.disabled = true
                stopButton1.disabled = false
                stopButton2.disabled = false
                stopButton3.disabled = false
                spinReels(symbols)
            } else {
                alert("Insufficiient Funds")
            }
        })

        stopButton1.addEventListener('click', () => {
            stopButton1.disabled = true
            checkReelsStopped()
        })

        stopButton2.addEventListener('click', () => {
            stopButton2.disabled = true
            checkReelsStopped()
        })

        stopButton3.addEventListener('click', () => {
            stopButton3.disabled = true
            checkReelsStopped()
        })
    }

    function spinReels(symbols) {        
        spinReel(reelImg1, stopButton1)
        spinReel(reelImg2, stopButton2)
        spinReel(reelImg3, stopButton3)

        function spinReel(reelImg, stopButton) {
            let interval = setInterval(() => {
                reelImg.src = symbols[Math.floor(Math.random() * symbols.length)].image
                if (stopButton.disabled) {
                    clearInterval(interval)
                    stoppedReels++
                    checkReelsStopped()
                }
            }, 100)
        }
    }

    function reactivatePlayButton() {
        if (reelImg1.src === reelImg2.src && reelImg2.src === reelImg3.src) {
            console.log('You Win')
            const matchedSymbolImg = reelImg1.src.split('/').pop()
            const matchedSymbol = symbols.find(symbol => symbol.image.includes(matchedSymbolImg))
            if (matchedSymbol) {
                playerPoints += matchedSymbol.points
                updatePointsDisplay()
            }
        }
        startButton.disabled = false
    }
    })