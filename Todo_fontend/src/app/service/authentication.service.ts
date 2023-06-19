import { TodoComponent } from './../todo/todo.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { JwtService } from './jwt.service';

export class User {
  constructor(public status: string) {}
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private jwtService: JwtService) {}
// Provide username and password for authentication, and once authentication is successful,
//store JWT token in session
  authenticate(username: string, password: string) {
    return this.httpClient
      .post<any>("http://localhost:8080/authenticate", { username, password })
      .pipe(
        map(userData => {
          sessionStorage.setItem("username", username);
          let tokenStr = "Bearer " + userData.token;
          sessionStorage.setItem("token", tokenStr);
          const usernameResponse = this.jwtService.getUsernameFromToken(tokenStr);// decode token to take the username
          console.log('Username:', usernameResponse);
          return userData;
        })
      );
  }
  register(username : string, password: string){
    return this.httpClient
      .post<any>("http://localhost:8080/register",{username, password})
      .pipe(
        map(response => {
          console.log('Registered successfully');
          return response;
        })
      );
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    console.log(!(user === null));
    return !(user === null);

  }

  logOut() {
    sessionStorage.removeItem("username");
  }


    error: string = '';
    changePassword(oldPassword: string, newPassword: string) {
      const username = sessionStorage.getItem("username");
      const request = {
        username: username,
        oldPassword: oldPassword,
        newPassword: newPassword
      };
      this.error = '';
      return this.httpClient.post<any>('http://localhost:8080/change-password', request);
    }


  }
