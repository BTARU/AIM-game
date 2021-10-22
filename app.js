const board = document.querySelector('#board')
const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'brown', 'deepskyblue', 'teal']
const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeCount = document.querySelector('#time')
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    } 
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    createRandomCircle()
    setInterval(decreaseTime, 1000)
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let currentTime = --time
    if (currentTime < 10) {
        currentTime = `0${currentTime}`
    }
    setTime(currentTime)
    }   
}

function setTime(value) {
    timeCount.textContent = `00:${value}`
}

function finishGame() {
    timeCount.parentNode.remove()
    board.innerHTML = `<h1>Ваш Счет: <span class="primary">${score}</span></h1>`
    
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = randomCircleParameters(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = randomCircleParameters(0, width - size)
    const y = randomCircleParameters(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = getRandomColor()

    board.append(circle)
}

function randomCircleParameters(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
 }

