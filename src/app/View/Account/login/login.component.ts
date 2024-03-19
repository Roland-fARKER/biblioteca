import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  signUpMode: boolean = false;

  toggleSignUp() {
    this.signUpMode = !this.signUpMode;
  }
}
