import { AuthGaurdService } from './service/auth-gaurd.service';
import { TodoComponent } from './todo/todo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', component: TodoComponent,  canActivate:[AuthGaurdService] },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'change-password', component: ChangePasswordComponent,  canActivate:[AuthGaurdService]},
  {path: 'user', component: UserComponent, canActivate:[AuthGaurdService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
