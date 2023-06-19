import { todo } from './../models/todo.model';

import { createAction, props } from '@ngrx/store';




/*export enum TodoActionType {
    ADD_TODO = '[TODO] Add todo'
    
}*/
  

export const addTodo = createAction('[TODO] Add Todo', props<{ todo: todo }>());
export const addTodoSuccess = createAction('[Todo] Add Todo Success', props<{ todo: todo }>());

export const updateTodo = createAction('[TODO] Update Todo', props<{ id: number, updatedTodo: todo }>());
export const removeTodo = createAction('[TODO] Remove Todo', props<{ id: number }>());


export const moveTodo = createAction('[Todo] Move Todo', props<{ id: number; newStatus: string }>());


//export type TodoAction = AddTodo //| UpdateTodo | RemoveTodo;