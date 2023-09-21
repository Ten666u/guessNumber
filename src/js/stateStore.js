let stateStore = {
    randomNumber: 0,
    rangeMin: 0,
    rangeMax: 0,
    counter: -1
}

export function resetStateStore(){
    stateStore = {
        randomNumber: 0,
        rangeMin: 0,
        rangeMax: 0,
        counter: -1
    }
}

export function writeRandomNumber(min, max){
    stateStore.rangeMin = Number(min)
    stateStore.rangeMax = Number(max)
    stateStore.randomNumber = Math.floor(Math.random() * (stateStore.rangeMax - stateStore.rangeMin + 1) + stateStore.rangeMin)

    console.log(stateStore.randomNumber);
    return stateStore.randomNumber
}

export function getRangeMin(){
    return stateStore.rangeMin
}

export function getRangeMax(){
    return stateStore.rangeMax
}

export function getCounter(){
    stateStore.counter++

    return stateStore.counter
}

export function getOutOfRange(inputNumber){
    if(stateStore.rangeMin > inputNumber || inputNumber > stateStore.rangeMax){
        return true
    }

    return false
}

export function checkWinGame(inputNumber){
    if(stateStore.randomNumber == inputNumber){
        return true
    }
    return false
}

export function checkMoreOrLess(inputNumber){
    if(inputNumber < stateStore.randomNumber){
        if(stateStore.counter % 3 == 0){
            return `Загаданное число больше и ${checkEvenOdd()}`
        }
        return "Загаданное число больше"
    }

    if(stateStore.counter % 3 == 0){
        return `Загаданное число меньше и ${checkEvenOdd()}`
    }

    return "Загаданное число меньше"
}

export function getRandomNumber(){
    return stateStore.randomNumber
}

const checkEvenOdd = () =>{
    if(stateStore.randomNumber % 2 == 0){
        return "четное"
    }
    return "нечетное"
}
