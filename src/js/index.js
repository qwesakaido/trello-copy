// Variables

const todoCount = document.querySelector('#todo-count')
const inProgressCount = document.querySelector('#in-progress-count')
const doneCount = document.querySelector('#done-count')

const todoCards = document.querySelector('#todo-cards')
const inProgressCards = document.querySelector('#in-progress-cards')
const doneCards = document.querySelector('#done-cards')

// Events

document.addEventListener('DOMContentLoaded', () => {
    updateTime()
    setInterval(updateTime, 1000)
})


// Methods

function updateCounts() {
    todoCount.textContent = todoCards.children.length
    inProgressCount.textContent = inProgressCards.children.length
    doneCount.textContent = doneCards.children.length
}

function updateTime() {
    const timeElement = document.querySelector('#time')
    const date = new Date()
    timeElement.textContent = date.toLocaleTimeString()
}