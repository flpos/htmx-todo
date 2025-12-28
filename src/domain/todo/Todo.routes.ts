import type { RequestListener } from 'node:http'
import { listTodos, createTodo, deleteTodo, editTodoForm, editTodo, toggleDone } from './Todo.controller.js'

export const todoRoutes: RequestListener = (req, res) => {
  if (req.url === undefined) {
    res.statusCode = 500
    res.end('Url invalida')
    return
  }

  if (req.url === '' && req.method === 'GET') {
    return listTodos(req, res)
  }

  if (req.url === '' && req.method === 'POST') {
    return createTodo(req, res)
  }

  if (/^\/.*/.test(req.url) && req.method === 'DELETE') {
    return deleteTodo(req, res)
  }

  if (/^\/.*\/edit$/.test(req.url) && req.method === 'GET') {
    return editTodoForm(req, res)
  }

  if (/^\/.*\/description$/.test(req.url) && req.method === 'PATCH') {
    return editTodo(req, res)
  }

  if (/^\/.*\/done$/.test(req.url) && req.method === 'PATCH') {
    return toggleDone(req, res)
  }
}
