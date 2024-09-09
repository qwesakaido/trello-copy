import { getCardsFromLocalStorage, saveCardsToLocalStorage, addCardToDOM } from './helpers.js'
import { updateCounts } from './helpers.js'
import { doneCards } from './variables.js'

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
    if (addTodoModal) addTodoModal.hide()

    updateCounts()
}

function handleClickRemoveAllCards() {
    doneCards.innerHTML = ''
    saveCardsToLocalStorage([])
    updateCounts()
}

function moveCard(cardElement, card) {
    const { value: newStatus } = cardElement.querySelector('#moveCardSelect')

    if (newStatus === 'in-progress') {
        const inProgressCards = document.querySelectorAll('#in-progress-cards .card')
        if (inProgressCards.length >= 6) {
            alert('Количество карточек в колонке "In Progress" превышает 6!')
            cardElement.querySelector('#moveCardSelect').value = card.status
            return
        }
    }

    card.status = newStatus

    cardElement.remove()
    document.querySelector(`#${newStatus}-cards`).append(cardElement)

    const cards = getCardsFromLocalStorage()
    const cardIndex = cards.findIndex(({ id }) => id === card.id)
    if (cardIndex !== -1) {
        cards[cardIndex] = card
        saveCardsToLocalStorage(cards)
    }

    updateCounts()
}

function removeCard(cardElement, card) {
    cardElement.remove()
    const cards = getCardsFromLocalStorage().filter(({ id }) => id !== card.id)
    saveCardsToLocalStorage(cards)
    updateCounts()
}

function editCard(card) {
    currentEditCard = card

    const { title, description, user } = card
    document.querySelector('#edit-todo-title').value = title
    document.querySelector('#edit-todo-description').value = description
    document.querySelector('#edit-todo-user').value = user

    const editModalElement = document.querySelector('#editTodoModal')
    const editTodoModal = new bootstrap.Modal(editModalElement)
    editTodoModal.show()
}

function handleSubmitEditTodo(event) {
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
}

export {
    handleClickRemoveAllCards,
    handleSubmitAddTodo,
    removeCard,
    moveCard,
    editCard,
    handleSubmitEditTodo,
}
