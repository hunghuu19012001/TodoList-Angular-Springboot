import { createTodo } from '../store/models/create.todo.model';
import { todo } from '../store/models/todo.model';
import { TodoItemService } from '../service/todo-item.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppState } from '../store/models/app-state.model';
import { select, Store } from '@ngrx/store';
import { moveTodo } from '../store/actions/todo.actions';
import { AuthenticationService } from '../service/authentication.service';
import { JwtService } from '../service/jwt.service';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent {
  tasks: todo[] = [];
  inprogress: todo[] = [];
  done: todo[] = [];
  updateIndex: number | undefined = undefined;

  isEdit: boolean = false;

  todo: todo = {
    id: 0,
    title: '',
    description: '',
    status: '',
    createdDate: new Date()
  };
  logo: string;
  constructor(private fb: FormBuilder,
    private todoItemService: TodoItemService,
    private store: Store<AppState>,
    private jwtService: JwtService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog /////
  ) {
    this.logo = 'https://upload.wikimedia.org/wikipedia/commons/8/81/Frente_de_Todos_2019.png'
  }


  ngOnInit(): void {
    this.getAllData();
  }

  //ham tinh so luong todo o moi trang thai
  countTaskByStatus(status: string): number{
    switch(status){
      case'todo':
        return this.tasks.length;
      case'inprogress':
        return this.inprogress.length;
      case'done':
        return this.done.length;
      default:
        return 0;
    }
  }

  getTodoItems(): void {
    this.todoItemService.getTodoItemList().subscribe(
      tasks => {
        this.tasks = tasks;
      });
  }

  /*getAllData(): void {
    this.todoItemService.getTodoItemList().subscribe(
      //data => this.tasks = data);
       data => {
          this.tasks = data.filter(item => item.status === 'new todo')
         this.inprogress = data.filter(item => item.status === 'in progress');
         this.done = data.filter(item => item.status === 'done');
       });

  }*/
  getAllData(): void {
    const usernameResponse = this.jwtService.getUsernameFromToken(sessionStorage.getItem("token") || "");//jwtservice lay usernameResponse tu token de truyen vào getusernamefromtoken
    this.todoItemService.getTodoItemListByUsername(usernameResponse).subscribe( //nhan data tra ve, sau do filter theo status
      data => {
        this.tasks = data.filter(item => item.status === 'new todo')
        this.inprogress = data.filter(item => item.status === 'in progress');
        this.done = data.filter(item => item.status === 'done');
      });
  }


addTask(status: string): void{
  const dialogRef = this.dialog.open(AddTaskDialogComponent,{

    data: {  isEdit: false, status: this.todo.status}

  });
  dialogRef.afterClosed().subscribe(result =>{
    if(result){
      this.createNewTask(result.title, result.description, status);

    }
  })

}
createNewTask(title: string, description: string, status: string):void{
  const item: createTodo = {title, description, status, createdDate: new Date()};
  this.todoItemService.createTodoItem(item).subscribe(() => {
    this.getAllData();
  });
}




  onEdit(item: todo, i: number): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      data: { title: item.title, description: item.description, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateTask(item.id, result.title, result.description);
      }
    });
  }

  updateTask(id: number, title: string, description: string): void {
    const updatedTodo: todo = {id, title, description, status: this.todo.status, createdDate: new Date()};
    this.todoItemService.updateTodoItem(updatedTodo).subscribe(() => {
      this.getAllData();
    });
  }


  deleteTask(item: todo) {

    this.todo = item
    this.todo.title = '';
    this.todoItemService.deleteTodoItem(this.todo.id).subscribe(() =>
      this.getAllData()
    )
    //this.store.dispatch(removeTodo({ id: this.todo.id }));

  }

  drop(event: CdkDragDrop<todo[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

      const movedTodo = event.container.data[event.currentIndex];
      const newStatus = event.container.id ;

      if (event.container.id === 'cdk-drop-list-1') {
        this.todoItemService.markTodoAsInProgress(movedTodo.id).subscribe(() => {
          this.store.dispatch(moveTodo({ id: movedTodo.id, newStatus }));

        });
      } else if (event.container.id === 'cdk-drop-list-2') {
        this.todoItemService.markTodoAsDone(movedTodo.id).subscribe(() => {
          this.store.dispatch(moveTodo({ id: movedTodo.id, newStatus }));

      });
      }

    }
  }

}

