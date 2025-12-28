import { randomUUID } from "node:crypto";
import type { Todo } from "./Todo.entity.js";

let todos: Array<Todo> = [
  {
    id: '123',
    description: 'Meu primeiro item',
    done: false,
  },
  {
    id: '456',
    description: 'Meu segundo item',
    done: true,
  }
]

export const getAllTodos = () => {
  return todos
}

export const getTodoById = (id: Todo['id']) => {
  return todos.find(t => t.id === id)
}

export const deleteTodoById = (id: Todo['id']) => {
  todos = todos.filter(t => t.id !== id)
  return todos
}

export const addTodo = (todo: Omit<Todo, 'id'>) => {
  const id = randomUUID()
  const newTodo = {
    ...todo,
    id,
  }
  todos.push(newTodo)
  return newTodo
}
