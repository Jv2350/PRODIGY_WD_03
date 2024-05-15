let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //player O
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    window.location.reload();
    document.querySelector(".msg-container").classList.remove("show");
};


const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    document.getElementById("winner").textContent = winner;
    document.querySelector(".msg-container").classList.add("show");
    disableBoxes();
}


const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

const gameDraw = () => {
    document.getElementById("msg").textContent = "Game has been Drawn";
    document.querySelector(".msg-container").classList.add("show");
    disableBoxes();
};


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turnO) {
                box.innerText = "O";
                box.classList.add("o-color"); // Add class for O
                turnO = false;
            } else {
                box.innerText = "X";
                box.classList.add("x-color"); // Add class for X
                turnO = true;
            }
            box.disabled = true;
            count++;

            let isWinner = checkWinner();
            if (count === 9 && !isWinner) {
                gameDraw();
            }
        }
    });
});


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
