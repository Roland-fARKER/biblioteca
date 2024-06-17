import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  signUpMode: boolean = false;
  loginEmail: string = '';
  loginPassword: string = '';
  registerName: string = '';
  registerEmail: string = '';
  registerPassword: string = '';
  registerConfirmPassword: string = '';

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) {}

  toggleSignUp() {
    this.signUpMode = !this.signUpMode;
  }

  async register() {
    if (this.registerPassword !== this.registerConfirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.registerEmail, this.registerPassword);
      const user = userCredential.user;

      if (user) {
        await this.firestore.collection('users').doc(user.uid).set({
          name: this.registerName,
          email: this.registerEmail,
          role: 'user'
        });
        alert('Registro exitoso');
        this.toggleSignUp(); // Switch back to login form
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      alert('Error en el registro');
    }
  }

  async login() {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.loginEmail, this.loginPassword);
      const user = userCredential.user;

      if (user) {
        alert('Login exitoso');
        this.router.navigate(['/']);
      }
    } catch (error) {
      console.error('Error en el login:', error);
      alert('Error en el login');
    }
  }
}