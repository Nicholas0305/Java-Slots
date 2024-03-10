document.addEventListener("DOMContentLoaded", () => {
  //Global Variables
  let symbols = [];
  const reels = document.querySelectorAll(".reels");
  const title = document.getElementById("title");
  //button that spins the reels
  const startButton = document.querySelector(".start-button");
  //all 3 stop buttons to stop each individual slot
  const stopButton1 = document.getElementById("stopButton1");
  const stopButton2 = document.getElementById("stopButton2");
  const stopButton3 = document.getElementById("stopButton3");
  //displays that show the user money/points earned
  const pointsDisplay = document.getElementById("points");
  const bankDisplay = document.getElementById("bank");
  //reel images on list
  const reelImg1 = document.getElementById("reelImg1");
  const reelImg2 = document.getElementById("reelImg2");
  const reelImg3 = document.getElementById("reelImg3");
  //grabs the form users can pay with money
  const form = document.getElementById("inputBucks");
  const jackList = document.getElementById("jackList");
  title.addEventListener("mouseover", (e) => {
    title.innerText = "Thanks for playing!";
    title.addEventListener("mouseleave", (e) => {
      title.innerText = "JavaSlots!";
    });
  });

  // add player points
  let playerPoints = 0;
  // render points
  function updatePointsDisplay() {
    pointsDisplay.textContent = `Points: ${playerPoints}`;
  }
  //add money to bank balance
  let playerBank = 1000;
  // set cost of each spin
  const costPerSpin = 50;
  // update bank display
  function updateBankDisplay() {
    form.addEventListener("submit", (e) => {
      playerBank += parseInt(e.target.input.value);
      e.preventDefault();
      console.log("submission");
      console.log(e.target.input.value);
      bankDisplay.textContent = `JavaBucks: ${playerBank}`;
    });

    bankDisplay.textContent = `JavaBucks: ${playerBank}`;
  }
  updateBankDisplay();
  // fetch array of objects
  fetch("http://127.0.0.1:3000/symbols")
    .then((response) => response.json())
    .then((data) => {
      symbols = data;
      buttons(symbols);
      jackPotList(symbols);
    });
  let stoppedReels = 0;

  function checkReelsStopped() {
    if (stoppedReels === 3) {
      awardMatchedImages();
    }
  }
  //Contains button functionality for start and stop
  function buttons(symbols) {
    startButton.addEventListener("click", () => {
      stoppedReels = 0;
      // every time button is pressed, takes away money
      if (playerBank >= costPerSpin) {
        playerBank -= costPerSpin;
        updateBankDisplay();
        startButton.disabled = true;
        stopButton1.disabled = false;
        stopButton2.disabled = false;
        stopButton3.disabled = false;
        spinReels(symbols);
      } else {
        alert("Insufficient Funds");
      }
    });

    stopButton1.addEventListener("click", () => {
      stopButton1.disabled = true;
      checkReelsStopped();
    });

    stopButton2.addEventListener("click", () => {
      stopButton2.disabled = true;
      checkReelsStopped();
    });

    stopButton3.addEventListener("click", () => {
      stopButton3.disabled = true;
      checkReelsStopped();
    });
  }

  function spinReels(symbols) {
    spinReel(reelImg1, stopButton1);
    spinReel(reelImg2, stopButton2);
    spinReel(reelImg3, stopButton3);

    function spinReel(reelImg, stopButton) {
      let interval = setInterval(() => {
        reelImg.src = symbols[Math.floor(Math.random() * symbols.length)].image;
        if (stopButton.disabled) {
          clearInterval(interval);
          stoppedReels++;
          checkReelsStopped();
        }
      }, 100);
    }
  }
  function awardMatchedImages() {
    // checks if 3 reels match
    if (reelImg1.src === reelImg2.src && reelImg2.src === reelImg3.src) {
      // need to take name of the image from the image
      const matchedSymbolImg = reelImg1.src.split("/").pop();
      let matchedSymbol = symbols.find((symbol) =>
        symbol.image.includes(matchedSymbolImg)
      );
      // if 3 matching images found, add points
      if (matchedSymbol) {
        // add points based on matched symbol
        playerPoints += matchedSymbol.points;
        // update what point container shows
        updatePointsDisplay();
        // add 10x javaBucks based on matched symbol
        const javaPrize = matchedSymbol.points * 10;
        playerBank += javaPrize;
        // update amount of javaBucks in container
        updateBankDisplay();

        // show jackpot animation
        const jackpotAnimation = document.getElementById("jackpotAnimation");
        const jackpotMessage = document.getElementById("jackpotMessage");
        jackpotAnimation.style.display = "block";
        jackpotMessage.textContent = `Congratulations! You've won ${javaPrize} JavaBucks!`;

        // hide animation after 3 seconds
        setTimeout(() => {
          jackpotAnimation.style.display = "none";
        }, 3000);
      }
    } else {
      // no animation if no jackpot
      jackpotAnimation.style.display = "none";
    }

    startButton.disabled = false;
  }

  function jackPotList(symbols) {
    const jackList = document.getElementById("jackList");
    symbols.forEach((symbols) => {
      const li = document.createElement("li");
      li.innerText = `${symbols.name}: ${symbols.points} JavaPoints`;
      jackList.appendChild(li);
    });
  }
});
