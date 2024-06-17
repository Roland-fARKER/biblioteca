import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('userToken')) {
      // El usuario está autenticado
      return true;
    } else {
      // El usuario no está autenticado, redirigir al login
      this.router.navigate(['/Login']);
      return false;
    }
  }
}