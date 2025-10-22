// ===============================
// Todo App — Clean Code Extended
// ===============================

// --- Selectors ---
const newTaskInput = document.getElementById('todo__new-task')
const addButton = document.querySelector('.todo__button--add')
const incompleteTasksHolder = document.getElementById('todo__list-incomplete')
const completedTasksHolder = document.getElementById('todo__list-completed')

// --- Create new task element ---
function createNewTaskElement(taskString) {
	const listItem = document.createElement('li')
	listItem.className = 'todo__item'

	const checkBox = document.createElement('input')
	checkBox.type = 'checkbox'
	checkBox.className = 'todo__checkbox'

	const label = document.createElement('label')
	label.className = 'todo__task'
	label.innerText = taskString

	const editInput = document.createElement('input')
	editInput.type = 'text'
	editInput.className = 'todo__input-edit'

	const editButton = document.createElement('button')
	editButton.className = 'todo__button todo__button--edit'
	editButton.innerText = 'Edit'

	const deleteButton = document.createElement('button')
	deleteButton.className = 'todo__button todo__button--delete'
	const deleteImg = document.createElement('img')
	deleteImg.src = './remove.svg'
	deleteImg.alt = 'Remove'
	deleteButton.appendChild(deleteImg)

	listItem.append(checkBox, label, editInput, editButton, deleteButton)
	return listItem
}

// --- Add new task ---
function addTask() {
	const text = newTaskInput.value.trim()
	if (!text) return

	const listItem = createNewTaskElement(text)
	incompleteTasksHolder.appendChild(listItem)
	bindTaskEvents(listItem, taskCompleted)
	newTaskInput.value = ''
}

// --- Edit existing task ---
function editTask() {
	const listItem = this.parentNode
	const editInput = listItem.querySelector('.todo__input-edit')
	const label = listItem.querySelector('.todo__task')
	const editBtn = listItem.querySelector('.todo__button--edit')
	const isEditMode = listItem.classList.contains('todo__item--edit')

	if (isEditMode) {
		label.innerText = editInput.value
		editBtn.innerText = 'Edit'
	} else {
		editInput.value = label.innerText
		editBtn.innerText = 'Save'
	}

	listItem.classList.toggle('todo__item--edit')
}

// --- Delete task ---
function deleteTask() {
	const listItem = this.parentNode
	const ul = listItem.parentNode
	ul.removeChild(listItem)
}

// --- Mark as completed ---
function taskCompleted() {
	const listItem = this.parentNode
	completedTasksHolder.appendChild(listItem)
	bindTaskEvents(listItem, taskIncomplete)
}

// --- Mark as incomplete ---
function taskIncomplete() {
	const listItem = this.parentNode
	incompleteTasksHolder.appendChild(listItem)
	bindTaskEvents(listItem, taskCompleted)
}

// --- Bind task events ---
function bindTaskEvents(taskListItem, checkBoxEventHandler) {
	const checkBox = taskListItem.querySelector('.todo__checkbox')
	const editButton = taskListItem.querySelector('.todo__button--edit')
	const deleteButton = taskListItem.querySelector('.todo__button--delete')

	editButton.onclick = editTask
	deleteButton.onclick = deleteTask
	checkBox.onchange = checkBoxEventHandler
}

// --- Event handlers ---
addButton.addEventListener('click', addTask)

// --- Initialize existing tasks ---
for (let i = 0; i < incompleteTasksHolder.children.length; i++) {
	bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted)
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete)
}

