import { escapeQuotes, escapeText } from "../../utils/encode-text.js"
import type { Todo } from "./Todo.entity.js"

export const renderTodo = (todo: Todo) => {
  if (!todo.description) {
    return `<li id="todo-${todo.id}">
  ${renderDescriptionForm(todo)}
</li>`
  }

  const htmlId = `todo-${todo.id}`

  return `<li id="${htmlId}" class="flex space-between">
  <label>
    <input
      name="done"
      type="checkbox"
      ${todo.done ? 'checked' : ''}
      hx-patch="/api/todos/${todo.id}/done"
      hx-target="#${htmlId}"
    />
    <span>${escapeText(todo.description)}</span>
  </label>
  <div>
    <button
      hx-get="/api/todos/${todo.id}/edit"
      hx-target="#${htmlId}"
      style="margin-left: auto;"
    >
      Editar
    </button>
    <button
      hx-delete="/api/todos/${todo.id}"
      hx-target="closest li"
      hx-swap="outerHTML"
    >
      Apagar
    </button>
  </div>
</li>`
}

export const renderDescriptionForm = (todo: Todo) => {
  const htmlId = `todo-${todo.id}`
  return `<form
    hx-patch="/api/todos/${todo.id}/description"
    hx-target="#${htmlId}"
  >
  <input
    type="text"
    name="description"
    required
    value="${escapeQuotes(todo.description)}"
  />
  <button type="submit">atualizar</button>
  </form>`
}

export const renderTodoList = (todos: Array<Todo>) => {
  return `<ul id="todos" class="flex flex-column gap-1">${todos.map((todo) => {
    return renderTodo(todo)
  }).join('')}
  </ul>
  <button hx-post="/api/todos" hx-target="#todos" hx-swap="beforeend">Novo</button>
  `
}

