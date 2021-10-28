

let minValue
let maxValue
let minus = ''
let btnStart
let btnRetry
let btnOk
let gameRun = true;

btnStart = document.getElementById("btnStart").addEventListener("click", start)
btnRetry = document.getElementById("btnRetry").addEventListener("click", retry)

// старт игры

function start() {
    document.getElementById("btnStart").style.opacity = 0
    getValue()
}

// получение макс, мин значений.
function getValue() {
    btnOk = document.getElementById("btnOk").addEventListener("click", getNumber)
    function getNumber() {

        document.querySelector(".game-card").style.opacity = 1
        minValue = parseInt(document.getElementById("minValue").value)
        maxValue = parseInt(document.getElementById("maxValue").value)
        if (!isNaN(maxValue)) {
            maxValue = maxValue > 999 ? 999 : maxValue;
        } else {
            maxValue = 100;
        }
        if (!isNaN(minValue)) {
            minValue = minValue < -999 ? -999 : minValue;
        } else {
            minValue = 0;
        }
        if (minValue < 0 || maxValue < 0) {
            minus = "-"
        }

        game()
    }
}

// рестарт-обнуление макс, мин значений и счетчика кол-ва ответов
function retry() {

    document.querySelector('#minValue').value = null
    document.querySelector('#maxValue').value = null
    orderNumberField = null
    answerField.innerText = ''
    document.getElementById("btnStart").style.opacity = 1
    document.querySelector(".game-card").style.opacity = 0
    getValue()
}

// случайный ответ при неудаче 
function phraseRandom() {
    const phraseRandom = Math.round(Math.random() * 3)
    switch (phraseRandom) {
        case 0: answerPhrase = `Вы загадали неправильное число!\n\u{1F914}`
            break;
        case 1: answerPhrase = `Я сдаюсь..\n\u{1F92F}`
            break;
        default: answerPhrase = `Я не знаю что ответить!!!\n\u{1F47F}`;
    }
    gameRun = false;
    return phraseRandom

}


// Игра
function game() {

    let answerNumber = Math.floor((minValue + maxValue) / 2)
    let orderNumber = 1;
    const orderNumberField = document.getElementById('orderNumberField')
    const answerField = document.getElementById('answerField')
    orderNumberField.innerText = orderNumber;
    answerField.innerText = `Вы загадали число ${numb(answerNumber).length <= 20 ? numb(answerNumber) : answerNumber}?`



    document.getElementById('btnOver').addEventListener('click', function () {
        if (gameRun) {
            if (minValue === maxValue) {
                phraseRandom()
                answerField.innerText = answerPhrase
            } else {
                minValue = answerNumber + 1
                answerNumber = Math.floor((minValue + maxValue) / 2)
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                answerField.innerText = `Вы загадали число ${numb(answerNumber).length <= 20 ? numb(answerNumber) : answerNumber}?`
            }
        }
    })
    document.getElementById('btnLess').addEventListener('click', function () {
        if (gameRun) {
            if (minValue === maxValue) {
                phraseRandom()
                answerField.innerText = answerPhrase
            } else {
                maxValue = answerNumber - 1
                answerNumber = Math.floor((minValue + maxValue) / 2)
                orderNumber++;
                orderNumberField.innerText = orderNumber;
                answerField.innerText = `Вы загадали число ${numb(answerNumber).length <= 20 ? numb(answerNumber) : answerNumber}?`
            }
        }
    })
    document.getElementById('btnEqual').addEventListener('click', function () {
        if (gameRun) {
            const phraseRandom = Math.round(Math.random() * 3)
            switch (phraseRandom) {
                case 0: answerPhrase = `Я всегда угадываю\n\u{1F60E}`
                    break;
                case 1: answerPhrase = `Я угадал!!! \n\u{1F914}`
                    break;
                default: answerPhrase = `Было трудно но я угадал\n\u{1F913}`;

                    answerField.innerText = answerPhrase
                    gameRun = false
            }
        }
    })

}

// вывод числа прописью 
function numb(answerNumber) {
    let A1 = ['один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'],
        A2 = ['одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'],
        A3 = ['десять', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'],
        A4 = ['сто', 'двести', 'триста', 'четыриста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот']

    let a = answerNumber
    let st = a.toString()
    let stL = st.length


    let _1 = parseInt(st[st.length - 1])
    let _10 = parseInt(st[st.length - 2])
    let _100 = parseInt(st[st.length - 3])

    if (a === 0) {
        return 'ноль'
    }

    else if (stL == 3 && _10 == 0 && _1 == 0) {
        return A4[_100 - 1]
    }
    else if (stL == 2 && _1 == 0) {
        return A3[_10 - 1]
    }
    else if (stL == 1) {
        return A1[_1 - 1]
    }
    else if (stL == 3 && _10 == 1) {
        return A4[_100 - 1] + ' ' + A2[_1 - 1]
    }
    else if (stL == 3) {
        return A4[_100 - 1] + ' ' + A3[_10 - 1] + ' ' + A1[_1 - 1]
    }
    else if (stL == 2 && _1 > 0 && _1 < 10 && _10 == 1) {
        return A2[_1 - 1]
    }
    else if (stL == 2) {
        return A3[_10 - 1] + ' ' + A1[_1 - 1]
    }

}



