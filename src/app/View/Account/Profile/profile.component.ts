import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor( private router : Router ){}

  logout() {
    this.router.navigate(['/Login']);
  }

  alInicio(){
    this.router.navigate(['/Home']);
  }
}
