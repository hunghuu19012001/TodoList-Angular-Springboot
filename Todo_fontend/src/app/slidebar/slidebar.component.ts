import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { JwtService } from '../service/jwt.service';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.scss']
})
export class SlidebarComponent {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private jwtService: JwtService
  ){}




  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']); // Điều hướng đến trang đăng nhập
    location.reload();
  }
}
