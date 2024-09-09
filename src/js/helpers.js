import { todoCount, inProgressCount, doneCount, todoCards, inProgressCards, doneCards } from './variables.js'
import { createCardTemplate } from './template.js'
import { moveCard, editCard, removeCard } from './handlers.js'

function updateTime() {
    const timeElement = document.querySelector('#time')
    const date = new Date()
    timeElement.textContent = date.toLocaleTimeString()
}

function updateCounts() {
    todoCount.textContent = todoCards.children.length
    inProgressCount.textContent = inProgressCards.children.length
    doneCount.textContent = doneCards.children.length
}

function saveCardsToLocalStorage(cards) {
    localStorage.setItem('cards', JSON.stringify(cards))
}

function getCardsFromLocalStorage() {
    const cards = localStorage.getItem('cards')
    return cards ? JSON.parse(cards) : []
}

function addCardToDOM(card) {
    const { status } = card
    const cardContainer = document.querySelector(`#${status}-cards`)
    const cardTemplate = createCardTemplate(card)

    cardContainer.insertAdjacentHTML('beforeend', cardTemplate)

    const cardElement = cardContainer.lastElementChild
    const moveSelect = cardElement.querySelector('#moveCardSelect')
    const editButton = cardElement.querySelector('#editCardButton')
    const removeButton = cardElement.querySelector('#removeCardButton')

    moveSelect.addEventListener('change', () => moveCard(cardElement, card))
    editButton.addEventListener('click', () => editCard(card))
    removeButton.addEventListener('click', () => removeCard(cardElement, card))
}

function render() {
    loadCardsFromLocalStorage()
    updateTime()
    setInterval(updateTime, 1000)
}

function loadCardsFromLocalStorage() {
    const cards = getCardsFromLocalStorage()
    cards.forEach(addCardToDOM)
    updateCounts()
}

export {
    updateTime,
    updateCounts,
    saveCardsToLocalStorage,
    getCardsFromLocalStorage,
    addCardToDOM,
    loadCardsFromLocalStorage,
    render,
}
