import { Action, createFeatureSelector, createReducer, on } from "@ngrx/store";
import { todo } from "../models/todo.model";
import { addTodo, addTodoSuccess, moveTodo, removeTodo, updateTodo } from "../actions/todo.actions";



export interface AppState {
    
    todos: todo[];
  }
export const initialState: AppState = {
    todos: []
};

export const todoReducer = createReducer(
  initialState,
  on(addTodo, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo]
  })),
  on(removeTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id)
  })),
  on(updateTodo, (state, { id, updatedTodo }) => ({
    ...state,
    todos: state.todos.map(todo => {
      if (todo.id !== id) {
        return todo;
      }
      return {
        ...todo,
        ...updatedTodo
      };
    })
  })),
  on(moveTodo, (state, { id, newStatus }) => {
    const updatedTodos = state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, status: newStatus };
      }
      return todo;
    });

    return { ...state, todos: updatedTodos };
  })
);

export function reducer(state: AppState | undefined, action: Action) {
  return todoReducer(state, action);
}

