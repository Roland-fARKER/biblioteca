import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  name: string = '';

  signUpMode: boolean = false;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private messageService: MessageService
  ) {}

  toggleSignUp() {
    this.signUpMode = !this.signUpMode;
  }

  async signUp() {
    if (this.password !== this.confirmPassword) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error al registrar usuario',
        detail: 'Las contraseñas no coinciden.',
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );
      const user = userCredential.user;

      // Guardar datos en Firestore
      await setDoc(doc(this.firestore, `users/${user.uid}`), {
        name: this.name,
        email: this.email,
        avatarId: 1,
        role: 'user',
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Éxito al registrar usuario',
        detail: 'Se guardaron los registros en la base de datos.',
      });

      this.router.navigate(['/']); // Redirigir al usuario a la página principal
    } catch (error) {
      console.error('Error al registrar usuario: ', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error al registrar usuario',
        detail: 'Ocurrió un error desconocido',
      });
    }
  }

  async login() {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        this.email,
        this.password
      );
      const user = userCredential.user;

      // Obtener el documento de usuario desde Firestore para obtener el rol
      const userDoc = await getDoc(doc(this.firestore, `users/${user.uid}`));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData['role'] || 'user';

        // Guardar el token de usuario y el rol en localStorage
        localStorage.setItem('userToken', await user.getIdToken());
        localStorage.setItem('userRole', userRole);
        

        this.router.navigate(['/']); // Redirigir al usuario a la página principal
      } else {
        throw new Error('Documento de usuario no encontrado en Firestore');
      }
    } catch (error) {
      console.error('Error al iniciar sesión: ', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error al iniciar sesión',
        detail: 'Ocurrió un error desconocido',
      });
    }
  }

  logout() {
    // Limpiar el token de usuario y el rol al cerrar sesión
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']); // Redirigir al usuario a la página de inicio de sesión
  }

  isLoggedIn(): boolean {
    // Verificar si el usuario está actualmente autenticado
    return !!localStorage.getItem('userToken');
  }
}
