// Variables

const todoCount = document.querySelector('#todo-count')
const inProgressCount = document.querySelector('#in-progress-count')
const doneCount = document.querySelector('#done-count')

const todoCards = document.querySelector('#todo-cards')
const inProgressCards = document.querySelector('#in-progress-cards')
const doneCards = document.querySelector('#done-cards')

const saveTodoButton = document.querySelector('#saveTodoButton')

let currentEditCard = null

// Events

document.addEventListener('DOMContentLoaded', () => {
    updateTime()
    setInterval(updateTime, 1000)
})

saveTodoButton.addEventListener('click', saveTodo)

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

function saveTodo() {
    const title = document.querySelector('#todo-title').value.trim()
    const description = document.querySelector('#todo-description').value.trim()
    const user = document.querySelector('#todo-user').value.trim()

    const newCard = {
        id: crypto.randomUUID(),
        title,
        description,
        user,
        status: 'todo'
    }

    addCardToDOM(newCard)
    console.log(newCard)

    const addTodoModalElement = document.querySelector('#addTodoModal')
    const addTodoModal = bootstrap.Modal.getInstance(addTodoModalElement)
    if (addTodoModal) {
        addTodoModal.hide()
    }

    updateCounts()
}

function addCardToDOM(card) {
    const cardContainer = document.querySelector(`#${card.status}-cards`)
    const cardTemplate = createCardTemplate(card)
    cardContainer.insertAdjacentHTML('beforeend', cardTemplate)
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