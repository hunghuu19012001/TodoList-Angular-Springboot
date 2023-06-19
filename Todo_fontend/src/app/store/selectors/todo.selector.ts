import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../models/app-state.model';



const getTodoState = createFeatureSelector<AppState>('todo');
export const getTodo = createSelector(getTodoState, (state: AppState) => {
    return state.todos;
});