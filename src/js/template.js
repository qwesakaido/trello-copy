function createCardTemplate(card) {
    const { id, title, description, user, status } = card

    return `
        <div class="card mb-3" data-id="${id}">
            <div class="card-body bg-light">
                <p><strong>Title:</strong> <span class="card-title">${title}</span></p>
                <p><strong>Description:</strong> <span class="card-description">${description}</span></p>
                <p><strong>User:</strong> <span class="card-user">${user}</span></p>
                <div class="d-flex justify-content-between">
                    <select class="form-select form-select-sm w-50" id="moveCardSelect">
                        <option value="todo" ${status === 'todo' ? 'selected' : ''}>Todo</option>
                        <option value="in-progress" ${status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                        <option value="done" ${status === 'done' ? 'selected' : ''}>Done</option>
                    </select>
                    <button class="btn btn-sm btn-primary" id="editCardButton">Edit</button>
                    <button class="btn btn-sm btn-danger" id="removeCardButton">Remove</button>
                </div>
            </div>
        </div>
    `
}

export {
    createCardTemplate
}
