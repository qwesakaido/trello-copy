// Variables
const todoCount = document.querySelector('#todo-count')
const inProgressCount = document.querySelector('#in-progress-count')
const doneCount = document.querySelector('#done-count')

const todoCards = document.querySelector('#todo-cards')
const inProgressCards = document.querySelector('#in-progress-cards')
const doneCards = document.querySelector('#done-cards')

const removeAllCardsButton = document.querySelector('#removeAllCardsButton')
const addTodoForm = document.querySelector('#addTodoForm')

let currentEditCard = null

// Events
document.addEventListener('DOMContentLoaded', () => {
    loadCardsFromLocalStorage()
    updateTime()
    setInterval(updateTime, 1000)
})

addTodoForm.addEventListener('submit', handleSubmitAddTodo)
removeAllCardsButton.addEventListener('click', handleClickRemoveAllCards)

// Template
function createCardTemplate(card) {
    return `
        <div class="card mb-3" data-id="${card.id}">
            <div class="card-body bg-light">
                <p><strong>Title:</strong> <span class="card-title">${card.title}</span></p>
                <p><strong>Description:</strong> <span class="card-description">${card.description}</span></p>
                <p><strong>User:</strong> <span class="card-user">${card.user}</span></p>
                <div class="d-flex justify-content-between">
                    <select class="form-select form-select-sm w-50" id="moveCardSelect">
                        <option value="todo" ${card.status === 'todo' ? 'selected' : ''}>Todo</option>
                        <option value="in-progress" ${card.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                        <option value="done" ${card.status === 'done' ? 'selected' : ''}>Done</option>
                    </select>
                    <button class="btn btn-sm btn-primary" id="editCardButton">Edit</button>
                    <button class="btn btn-sm btn-danger" id="removeCardButton">Remove</button>
                </div>
            </div>
        </div>
    `
}

// Methods

function handleSubmitAddTodo(event) {
    event.preventDefault()

    const { target } = event
    const formData = new FormData(target)
    const formDataEntries = Object.fromEntries(formData.entries())

    const newCard = {
        id: crypto.randomUUID(),
        ...formDataEntries,
        status: 'todo',
    }

    const cards = getCardsFromLocalStorage()
    cards.push(newCard)
    saveCardsToLocalStorage(cards)

    addCardToDOM(newCard)
    target.reset()

    const addTodoModalElement = document.querySelector('#addTodoModal')
    const addTodoModal = bootstrap.Modal.getInstance(addTodoModalElement)
    if (addTodoModal) {
        addTodoModal.hide()
    }

    updateCounts()
}

function handleClickRemoveAllCards() {
    todoCards.innerHTML = ''
    inProgressCards.innerHTML = ''
    doneCards.innerHTML = ''

    saveCardsToLocalStorage([])

    updateCounts()
}

function addCardToDOM(card) {
    const cardContainer = document.querySelector(`#${card.status}-cards`)
    const cardTemplate = createCardTemplate(card)
    cardContainer.insertAdjacentHTML('beforeend', cardTemplate)

    const cardElement = cardContainer.lastElementChild
    cardElement.querySelector('#moveCardSelect').addEventListener('change', () => moveCard(cardElement, card))
    cardElement.querySelector('#editCardButton').addEventListener('click', () => editCard(card))
    cardElement.querySelector('#removeCardButton').addEventListener('click', () => removeCard(cardElement, card))
}

function moveCard(cardElement, card) {
    const select = cardElement.querySelector('#moveCardSelect')
    const newStatus = select.value
    card.status = newStatus

    cardElement.remove()
    document.querySelector(`#${newStatus}-cards`).appendChild(cardElement)

    const cards = getCardsFromLocalStorage()
    const cardIndex = cards.findIndex((c) => c.id === card.id)
    if (cardIndex !== -1) {
        cards[cardIndex] = card
        saveCardsToLocalStorage(cards)
    }

    updateCounts()
}

function removeCard(cardElement, card) {
    cardElement.remove()

    const cards = getCardsFromLocalStorage().filter((c) => c.id !== card.id)
    saveCardsToLocalStorage(cards)

    updateCounts()
}

function editCard(card) {
    currentEditCard = card

    document.querySelector('#edit-todo-title').value = card.title
    document.querySelector('#edit-todo-description').value = card.description
    document.querySelector('#edit-todo-user').value = card.user

    const editModalElement = document.querySelector('#editTodoModal')
    const editTodoModal = new bootstrap.Modal(editModalElement)
    editTodoModal.show()
}

const editTodoForm = document.querySelector('#editTodoForm')
editTodoForm.addEventListener('submit', function (event) {
    event.preventDefault()

    if (!currentEditCard) return

    currentEditCard.title = document.querySelector('#edit-todo-title').value
    currentEditCard.description = document.querySelector('#edit-todo-description').value
    currentEditCard.user = document.querySelector('#edit-todo-user').value

    const cards = getCardsFromLocalStorage()
    const cardIndex = cards.findIndex((c) => c.id === currentEditCard.id)
    if (cardIndex !== -1) {
        cards[cardIndex] = currentEditCard
        saveCardsToLocalStorage(cards)
    }

    const cardElement = document.querySelector(`[data-id="${currentEditCard.id}"]`)
    cardElement.querySelector('.card-title').textContent = currentEditCard.title
    cardElement.querySelector('.card-description').textContent = currentEditCard.description
    cardElement.querySelector('.card-user').textContent = currentEditCard.user

    const editModalElement = document.querySelector('#editTodoModal')
    const editTodoModal = bootstrap.Modal.getInstance(editModalElement)
    if (editTodoModal) {
        editTodoModal.hide()
    }
})

function getCardsFromLocalStorage() {
    const cards = localStorage.getItem('cards')
    return cards ? JSON.parse(cards) : []
}

function saveCardsToLocalStorage(cards) {
    localStorage.setItem('cards', JSON.stringify(cards))
}

function loadCardsFromLocalStorage() {
    const cards = getCardsFromLocalStorage()
    cards.forEach(addCardToDOM)
    updateCounts()
}

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
