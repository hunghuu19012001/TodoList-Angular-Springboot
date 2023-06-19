import { LoginComponent } from './security/login/login.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { TodoComponent } from './todo/todo.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/reducers/todo.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BasicAuthInterceptorService } from './service/basic-auth-interceptor.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RegisterComponent } from './security/register/register.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TodoComponent,
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    DragDropModule,
    FormsModule,
    StoreModule.forRoot({ todo: reducer }),
    StoreDevtoolsModule.instrument(),
    MatProgressSpinnerModule,
    MatDialogModule,
    MatMenuModule


  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]

})
export class AppModule { }
