import { AuthenticationService } from 'src/app/service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  username = ''
  password = ''
  error = ''
  public showSpinner = false;

  
  constructor(private router: Router, private authService: AuthenticationService){}
  ngOnInit(): void {
    
  }
  onSubmit(): void{
    this.showSpinner = true;
    this.authService.register(this.username, this.password)
    .subscribe(
      () => {
        this.showSpinner = false;
        alert("Successful account registration!")
        this.router.navigate(['/login']); // chuyển hướng đến trang login sau khi đăng ký thành công
        
      },
      /*error => {
        this.showSpinner = false;
        this.error = `Đăng ký thất bại: ${'vui lòng nhập lại!'}`; // hiển thị thông báo đăng ký thất bại
      },*/
      error =>{
        this.showSpinner = false;
          if (error.status === 500) {
            this.error =
              'The username already exists!';
          }else if (error.status === 400 ) {
            this.error =
              'Password must be at least 8 characters!';
          } 
    }
    );
  }
}
