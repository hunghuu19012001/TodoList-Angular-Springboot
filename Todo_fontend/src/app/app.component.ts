//import { addTodo} from './store/actions/todo.actions';
import { Component, OnInit } from '@angular/core';
//import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { todo } from './store/models/todo.model';
//import { AppState } from './store/models/app-state.model';
//import { Todo } from './store/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'AngularTodo';


  todos$: Observable<todo[]>;
  todoForm: any;


  constructor(private store: Store<{ todos: todo[] }>) {
    this.todos$ = store.select('todos');
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.todos$ = this.store.pipe(select(state => state.todos.filter(todo => !todo.status)));
    
  }



}


