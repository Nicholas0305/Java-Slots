document.addEventListener('DOMContentLoaded', () => {
    const reels = document.querySelectorAll('.reels');
    const startButton = document.querySelector('.start-button');
    const stopButton = document.querySelector('.stop-button');
    const pointsDisplay = document.getElementById('points');
    const bankDisplay = document.getElementById('bank');

    // Fetch and setup slot machine
    let symbols = [];
    // fetch array of objects
    fetch("http://127.0.0.1:3000/symbols")
        .then(response => response.json())
        .then((fetchedSymbols) => {
            fetchedSymbols.forEach((fetchedSymbols) => {
                console.log(fetchedSymbols)
                setUpSlots(fetchedSymbols)
            })
            let newSymbols = [...fetchedSymbols]
            console.log(newSymbols)
        })
    //takes in array of objects and sets them to list
    function setUpSlots(fetchedSymbols) {
        for (let i = 0; i < fetchedSymbols.length; i++) {
            let img = reels.children[i]
            img.src = fetchedSymbols.image
        }
    }



    // made a copy of the array via spread operator in the spinReels function
    function spinReels(fetchedSymbols) {
        let newSymbols = [...fetchedSymbols]
        //shuffle the array
        function shuffle(newSymbols) {
            for (let i = newSymbols.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newSymbols[i], newSymbols[j]] = [newSymbols[j], newSymbols[i]];
            }

        }
        shuffle()
        return newSymbols;
    }
})




// return new copy of array with list of objects
// iterate through the array, and asign image objects to the reels list

