import { createTodo } from './../store/models/create.todo.model';
import { removeTodo, updateTodo } from './../store/actions/todo.actions';
import { Store } from '@ngrx/store';
import { todo } from './../store/models/todo.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { addTodo } from '../store/actions/todo.actions';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {


  private basUrl = "http://localhost:8080/todo"
  todos$: Observable<todo[]>;

  constructor(private authService: AuthenticationService,private httpClient: HttpClient, private store: Store<{ todos: todo[] }>) {
    this.todos$ = store.select('todos');
  }

  getTasks(): todo[] {
    return this.tasks;
  }
  private tasks: todo[] = [];


  getTodoItemListByUsername(username: string): Observable<todo[]> {   //to take username as parameter
    const url = `${this.basUrl}/${username}`; 
    return this.httpClient.get<todo[]>(url).pipe(
      tap(todos => {
        this.tasks = todos; // Cập nhật tasks trong TodoComponent
      })
    );
  }
  
 getTodoItemList(): Observable<todo[]> {
    //return this.httpClient.get<todo[]>( `${this.basUrl}`);
    return this.httpClient.get<todo[]>(`${this.basUrl}`).pipe(
      tap(todos => {
        this.tasks = todos; // Cập nhật tasks trong TodoComponent
      })
    );

  }

  createTodoItem(todoItem: createTodo) {
    // this.httpClient.post<todo>(`${this.basUrl}`, todoItem).subscribe(data => {
    //   console.log(data);
    //   return this.store.dispatch(addTodo({ todo: data }));//gọi từ store để gửi một hành động addTodo cho reducer
    // });
    const url = `${this.basUrl}`; // Đường dẫn API hoặc backend tương ứng

    return this.httpClient.post(url, todoItem);
  }

  updateTodoItem(todo: todo) {
    this.httpClient.put<todo>(`${this.basUrl}/${todo.id}`, todo).subscribe(
      updatedTodo => {
        this.store.dispatch(updateTodo({
          id: updatedTodo.id,
          updatedTodo: updatedTodo
        }));
      })
  }

  deleteTodoItem(id: number) {
    const url = `${this.basUrl}/${id}`;
    return this.httpClient.delete(url);
    // return this.httpClient.delete(url).subscribe(() => {
    //   //this.store.dispatch(removeTodo({ id }));
    //   this.store.dispatch(removeTodo({ id: id }));

    // });
  }

  //update status

  markTodoAsInProgress(id: number) {
    const url = `${this.basUrl}/${id}/inprogress`;  //call api set.title 
    return this.httpClient.put(url, {});
  }
  markTodoAsDone(id: number) {
    const url = `${this.basUrl}/${id}/done`;
    return this.httpClient.put(url, {});
  }
}