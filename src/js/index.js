import { render } from "./helpers.js"
import { removeAllCardsButton, addTodoForm, editTodoForm } from "./variables.js"
import { handleSubmitAddTodo, handleClickRemoveAllCards, handleSubmitEditTodo } from "./handlers.js"

addTodoForm.addEventListener('submit', handleSubmitAddTodo)
removeAllCardsButton.addEventListener('click', handleClickRemoveAllCards)
editTodoForm.addEventListener('submit', handleSubmitEditTodo)
render()