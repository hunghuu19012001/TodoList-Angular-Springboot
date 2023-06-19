import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username = ''
  password = ''
  invalidLogin = false
  showSpinner = false
  @Input() error: string | null | undefined;

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
  }
  goToRegister() {
    this.router.navigate(['register']);
  }
  
  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        this.router.navigate([''])
        this.invalidLogin = false
        alert("Logged in successfully !")
        
      },
      error => {
        this.invalidLogin = true
        //this.error = error.message;
        this.error="Incorrect username or password !"
      }
    )
    );

  }
}
