import type { RequestListener } from 'http'
import { getAllTodos, getTodoById, deleteTodoById, addTodo } from './Todo.repository.js'
import { renderTodoList, renderDescriptionForm, renderTodo } from './Todo.views.js'

export const listTodos: RequestListener = (_req, res) => {
  res.end(renderTodoList(getAllTodos()))
}

export const toggleDone: RequestListener = async (req, res) => {
  const id = req.url!.replace('/', '').replace('/done', '')
  const todo = getTodoById(id)

  const body = await new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk.toString()
    }).on('end', () => resolve(data)).on('error', reject).read()
  })

  if (!todo) {
    res.statusCode = 422
    res.end('Todo não existe')
    return
  }

  todo.done = body === 'done=on'

  res.statusCode = 200
  res.end(renderTodo(todo))
}

export const editTodoForm: RequestListener = (req, res) => {
  const id = req.url!.replace('/', '').replace('/edit', '')
  const todo = getTodoById(id)

  if (!todo) {
    res.statusCode = 422
    res.end('Todo não existe')
    return
  }

  res.end(renderDescriptionForm(todo))
}

export const editTodo: RequestListener = async (req, res) => {
  const id = req.url!.replace('/', '').replace('/description', '')
  const todo = getTodoById(id)

  if (!todo) {
    res.statusCode = 422
    res.end('Todo não existe')
    return
  }

  const body = await new Promise<URLSearchParams>((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk.toString()
    }).on('end', () => resolve(new URLSearchParams(data))).on('error', reject).read()
  })
  const newDescription = body.get('description')

  if (!newDescription) {
    res.statusCode = 422
    res.end('Parametros inválidos')
    return
  }

  todo.description = newDescription

  res.end(renderTodo(todo))
}

export const deleteTodo: RequestListener = (req, res) => {
  const id = req.url!.replace('/', '')
  deleteTodoById(id)
  res.statusCode = 201
  res.end()
}

export const createTodo: RequestListener = (_req, res) => {
  const newTodo = addTodo({
    description: '',
    done: false,
  })

  res.end(`<li id="todo-${newTodo.id}">
  ${renderDescriptionForm(newTodo)}
</li>`)
}
