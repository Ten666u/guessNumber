let stateStore = {
    randomNumber: 0,
    rangeMin: 0,
    rangeMax: 0,
    counter: -1,

    getRangeMin: function(){
        return this.rangeMin
    },

    getRangeMax: function(){
        return this.rangeMax
    },

    getCounter: function() {
        this.counter++;
    
        return this.counter;
    },

    resetStateStore: function () {
        this.randomNumber = 0;
        this.rangeMin = 0;
        this.rangeMax = 0;
        this.counter = -1;
    },

    writeRandomNumber: function (min, max) {
        this.rangeMin = Number(min);
        this.rangeMax = Number(max);
        this.randomNumber = Math.floor(
            Math.random() * (this.rangeMax - this.rangeMin + 1) + this.rangeMin
        );

        console.log(this.randomNumber);

        return this.randomNumber;
    },

    getOutOfRange: function (inputNumber) {
        if (
            this.rangeMin > inputNumber ||
            inputNumber > this.rangeMax
        ) {
            return true;
        }
    
        return false;
    },

    checkWinGame: function (inputNumber) {
        if (this.randomNumber == inputNumber) {
            return true;
        }
        return false;
    },

    checkMoreOrLess: function (inputNumber) {
        if (inputNumber < this.randomNumber) {
            if (this.counter % 3 == 0) {
                return `Загаданное число больше и ${checkEvenOdd()}`;
            }
            return "Загаданное число больше";
        }
    
        if (this.counter % 3 == 0) {
            return `Загаданное число меньше и ${checkEvenOdd()}`;
        }
    
        return "Загаданное число меньше";
    },

    getRandomNumber: function () {
        return this.randomNumber;
    }
};

const checkEvenOdd = () => {
    if (stateStore.randomNumber % 2 == 0) {
        return "четное";
    }
    return "нечетное";
};

export { stateStore };
