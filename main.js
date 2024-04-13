const btnRef = document.querySelectorAll(".tile");
const popupRef = document.querySelector(".popup");
const newgameBtn = document.getElementById("new-game");
const restartBtn = document.getElementById("restart");
const msgRef = document.getElementById("message");

const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

let xTurn = true;
let count = 0;

const disableButton = () => {
    btnRef.forEach((element) => (element.disabled = true));
    popupRef.classList.remove("hide");
}

const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    popupRef.classList.add("hide");
}
const handleWin = (letter) => {
    disableButton();
    msgRef.innerHTML = letter === "X" ? "&#x1F389; <br> 'X' Wins" : "&#x1F389; <br> 'O' Wins";
    if (letter === "X") {
        msgRef.innerHTML += "<br> You win!";
    } else {
        msgRef.innerHTML += "<br> You win!";
    }
}


const handleDraw = () => {
    disableButton();
    msgRef.innerHTML = "&#x1F60E; <br> It's a draw";
}

newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

const checkWin = () => {
    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        const textA = btnRef[a].innerText;
        const textB = btnRef[b].innerText;
        const textC = btnRef[c].innerText;
        if (textA && textA === textB && textB === textC) {
            handleWin(textA);
            return;
        }
    }
    if (count === 9) {
        handleDraw();
    }
}

btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (!element.innerText) {
            element.innerText = xTurn ? "X" : "O";
            element.disabled = true;
            xTurn = !xTurn;
            count++;
            checkWin();
        }
    });
});

enableButtons();
