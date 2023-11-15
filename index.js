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
        })

        stopButton2.addEventListener('click', () => {
            stopButton2.disabled = true
        })

        stopButton3.addEventListener('click', () => {
            stopButton3.disabled = true
        })
    }

    function spinReels(symbols) {
        let interval1 = setInterval(() => {

            reelImg1.src = symbols[Math.floor(Math.random() * symbols.length)].image
            if (stopButton1.disabled) {
                clearInterval(interval1);
                const result1 = reelImg1.src
                return result1
            }
        }, 100);

        let interval2 = setInterval(() => {

            reelImg2.src = symbols[Math.floor(Math.random() * symbols.length)].image
            if (stopButton2.disabled) {
                clearInterval(interval2);
                const result2 = reelImg2.src
                return result2
            }
        }, 100);

        let interval3 = setInterval(() => {

            reelImg3.src = symbols[Math.floor(Math.random() * symbols.length)].image
            if (stopButton3.disabled) {
                clearInterval(interval3);
                const result3 = reelImg3.src
                return result3
            }
        }, 100);
        if (stopButton1.disabled === true && stopButton2.disabled === true && stopButton3.disabled === true) {
            if (reelImg1.src === reelImg2.src && reelImg2.src === reelImg3.src) {
                console.log('You win')
            }

        }
    }























})