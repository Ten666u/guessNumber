import {
    stateStore
} from "./stateStore.js";

const MAX_NUMBER = 10000;
const MIN_NUMBER = -10000;

const playerContainer = document.getElementById("playerContainer");

const readyButton = () => {
    let selectRange = document.getElementById("selectRange");

    if (selectRange.checked) {
        chooseRangeStage();
        return;
    }
    stateStore.writeRandomNumber(1, 100);
    guessNumberStage();
};

//Стадия выбора диапазона
const chooseRangeStage = () => {
    playerContainer.innerHTML = "";

    let chooseRangeStage = `
        <h3>Введите диапазон чисел</h3>
        <span class="system_range">Минимальное: ${MIN_NUMBER}, Максимальное: ${MAX_NUMBER}</span>
        <div class = "input_range">
            [
            <input type="number" step= "1" class="input_number-max" id="inputMinNumber" placeholder="${MIN_NUMBER}">
            <button class="input_switch-button" id="inputSwitchButton">↔</button>
            <input type="number" step= "1" class="input_number-min" id="inputMaxNumber" placeholder="${MAX_NUMBER}">
            ]
            <span class="input_min-error"></span>
            <span class="input_max-error"></span>
        </div>
        <button class="input_range-confirm" id="inputMaxConfirm">Ввести число</button>
        <button class="reset_game-button" id="restartGameButton">Начать заново</button>
    `;

    playerContainer.insertAdjacentHTML("beforeend", chooseRangeStage);

    let inputMinNumber = playerContainer.querySelector("#inputMinNumber");
    let inputMaxNumber = playerContainer.querySelector("#inputMaxNumber");
    let inputMaxConfirm = playerContainer.querySelector("#inputMaxConfirm");
    let inputSwitchButton = playerContainer.querySelector("#inputSwitchButton");
    let restartGameButton = playerContainer.querySelector("#restartGameButton");

    inputMaxNumber.addEventListener("input", checkInputMaxNumber);
    inputMinNumber.addEventListener("input", checkInputMinNumber);
    inputMaxConfirm.addEventListener("click", checkRange);
    inputSwitchButton.addEventListener("click", inputSwitch);
    restartGameButton.addEventListener("click", restartGame);
};

const inputSwitch = () => {
    let max = inputMaxNumber.value;
    let min = inputMinNumber.value;
    let inputMaxError = playerContainer.querySelector(".input_max-error")
    let inputMinError = playerContainer.querySelector(".input_min-error")

    inputMinNumber.value = max;
    inputMaxNumber.value = min;

    if (Number(max) <= Number(min)) {
        inputMinNumber.classList.remove("error");
        inputMaxNumber.classList.remove("error");
        inputMinError.textContent = ""
        inputMaxError.textContent = ""
    }
};

const checkInputMinNumber = (e) => {
    let elem = e.target;
    let inputMinError = playerContainer.querySelector(".input_min-error")

    if (/[,.]/g.test(elem.value)) {
        let str = elem.value.replace(/[,.]/g, "");
        elem.value = str;
    }

    let minValue = Number(elem.value);
    let maxValue = Number(inputMaxNumber.value);

    if (MIN_NUMBER <= minValue && minValue <= maxValue) {
        inputMinNumber.classList.remove("error");
        inputMinError.textContent = ""
        return;
    }
};

const checkInputMaxNumber = (e) => {
    let elem = e.target;
    let inputMaxError = playerContainer.querySelector(".input_max-error")

    if (/[,.]/g.test(elem.value)) {
        let str = elem.value.replace(/[,.]/g, "");
        elem.value = str;
    }

    let minValue = Number(inputMinNumber.value);
    let maxValue = Number(elem.value);

    if (maxValue <= MAX_NUMBER && minValue <= maxValue) {
        inputMaxNumber.classList.remove("error");
        inputMaxError.textContent = ""
        return;
    }
};

const checkRange = (e) => {
    let max = inputMaxNumber.value;
    let min = inputMinNumber.value;
    let inputMaxError = playerContainer.querySelector(".input_max-error")
    let inputMinError = playerContainer.querySelector(".input_min-error")


    if (min === "" || Number(min) < MIN_NUMBER) {
        inputMinNumber.classList.add("error");
        min == "" ? inputMinError.textContent = "Введите предел": inputMinError.textContent = "Число меньше предела"
        return;
    }

    if (max === "" || Number(max) > MAX_NUMBER) {
        inputMaxNumber.classList.add("error");
        max === "" ? inputMaxError.textContent = "Введите предел":
        inputMaxError.textContent = "Число больше предела"

        return;
    }

    if (Number(min) > Number(max)) {
        inputMaxNumber.classList.add("error");
        inputMinNumber.classList.add("error");
        inputMaxError.textContent = "Проверьте диапазон"
        inputMinError.textContent = "Проверьте диапазон"

        return;
    }

    stateStore.writeRandomNumber(min, max);
    guessNumberStage();
};

//Стадия угадывания чисел
const guessNumberStage = () => {
    playerContainer.innerHTML = "";

    let guessNumberElements = `
        <h4>Число загадано в диапазоне: [${stateStore.getRangeMin()}, ${stateStore.getRangeMax()}]</h4>
        <div class = "input_number-container">
            <span class="hint"></span>
            <input type="text" step= "1" class="input_number" id="inputNumber" placeholder="Введите число">
            <span class="input_number-error"></span>
        </div>
        <div class="input_count-txt">Количество попыток: <span class="input_count" id="inputCount">${stateStore.getCounter()}</span></div>
        <button class="input_number-confirm" id="inputNumberConfirm">Отгадать число</button>
        <button class="reset_game-button" id="restartGameButton">Начать заново</button>
    `;

    playerContainer.insertAdjacentHTML("beforeend", guessNumberElements);

    let inputNumber = playerContainer.querySelector("#inputNumber");
    let inputNumberConfirm = playerContainer.querySelector("#inputNumberConfirm");
    let restartGameButton = playerContainer.querySelector("#restartGameButton");

    inputNumber.addEventListener("input", throttle(validInputNumber,0));
    restartGameButton.addEventListener("click", restartGame);
    inputNumberConfirm.addEventListener("click", checkInputNumber)
};

const validInputNumber = (e) => {
    let elem = e.target;
    let value = elem.value
    let inputNumberError = playerContainer.querySelector('.input_number-error')

    value = value.match(/^-?\d*/);

    if(value == "" || value == "-"){
        elem.value = value
        return
    }

    if(value !== ""){
        elem.classList.remove('error')
        inputNumberError.textContent = ""
    }

    elem.value = value;
};

const checkInputNumber = () =>{
    let value = Number(inputNumber.value)

    let inputCount = playerContainer.querySelector("#inputCount")
    let inputNumberError = playerContainer.querySelector('.input_number-error')
    let hint = playerContainer.querySelector(".hint")

    if(inputNumber.value == "" || inputNumber.value == "-"){
        inputNumber.classList.add("error")
        inputNumberError.textContent = "Укажите число"

        return
    }

    let counter = stateStore.getCounter()

    if(stateStore.getOutOfRange(value)){
        inputNumber.classList.add("error")
        inputNumberError.textContent = "Выход за предел диапазона"
    }

    if(stateStore.checkWinGame(value)){
        victoryStage()
        return
    }

    hint.textContent = stateStore.checkMoreOrLess(value)
    inputCount.innerHTML = counter
    inputNumber.value = ""
}

function throttle(callee, timeout) {
    let timer = null;

    return function perform(...args) {
        if (timer) return;

        timer = setTimeout(() => {
            callee(...args);

            clearTimeout(timer);
            timer = null;
        }, timeout);
    };
}

//Стадия победы
const victoryStage = () =>{
    playerContainer.innerHTML = ""

    let victoryHTML = `
        <marquee behavior="alternate">
            <h1>Победа!!!<h1>
            
        </marquee>
        <marquee direction="right" behavior="alternate">
            <h1>Число: ${stateStore.getRandomNumber()}<h1>
        </marquee>
        <marquee behavior="alternate">
            <h1>Попыток: ${stateStore.getCounter() - 1}<h1>
        </marquee>
        <button class="reset_game-button" id="restartGameButton">Начать заново</button>
    `

    playerContainer.innerHTML = victoryHTML

    let restartGameButton = playerContainer.querySelector("#restartGameButton")
    restartGameButton.addEventListener('click', restartGame)
}

//Функция перезапуска игры
const restartGame = () => {
    stateStore.resetStateStore();

    playerContainer.innerHTML = `
    <div class="select_range-container">
        <label for="selectRange"><h5>Выбрать свой диапазон?</h5></label>
        <input type="checkbox" id="selectRange">
    </div>
    <button class="start-button" id="startButton">
        Начать игру
    </button>
    `;
    let startButton = playerContainer.querySelector("#startButton");

    startButton.addEventListener("click", readyButton);
};

export { readyButton };
