import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user = {
    name: '',
    email: '',
    password: ''
  };

  save() {
    // Logic to save user details (e.g., send to server)
    console.log('User details saved', this.user);
  }
}
