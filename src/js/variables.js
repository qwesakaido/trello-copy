const todoCount = document.querySelector('#todo-count')
const inProgressCount = document.querySelector('#in-progress-count')
const doneCount = document.querySelector('#done-count')

const todoCards = document.querySelector('#todo-cards')
const inProgressCards = document.querySelector('#in-progress-cards')
const doneCards = document.querySelector('#done-cards')

const removeAllCardsButton = document.querySelector('#removeAllCardsButton')
const editTodoForm = document.querySelector('#editTodoForm')
const addTodoForm = document.querySelector('#addTodoForm')

let currentEditCard = null

export {
    todoCount,
    inProgressCount,
    doneCount,
    todoCards,
    inProgressCards,
    doneCards,
    removeAllCardsButton,
    editTodoForm,
    addTodoForm,
    currentEditCard,
}