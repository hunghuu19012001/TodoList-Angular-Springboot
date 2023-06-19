import { Component } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  oldPassword: string='';
  newPassword: string='';
  confirmPassword: string='';
  error: string='';
  showSpinner: string='';

  constructor(private authService: AuthenticationService) {}

  changePassword() {
    if(this.newPassword != this.confirmPassword){
      this.error = 'Confirm Passwords do not match';
      return;
    }

    this.authService.changePassword(this.oldPassword, this.newPassword).subscribe(
      () => {

        //this.error = 'Change password successfully'
      },
      (error: any) => {
        if (error.status === 400) {
          if (error.error === 'Old password is incorrect') {
            this.error = 'Old password is incorrect';
          } else if (error.error === 'New password must be at least 8 characters') {
            this.error = 'New password must be at least 8 characters';
          }
        } else {

          alert('Change password successfully');
        }
      }
    );
    // Reset error message when user starts entering new values
    this.error = '';
  }

}
