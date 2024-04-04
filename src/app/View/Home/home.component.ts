import { Component } from '@angular/core';
import { notificaciones } from '../../Models/librosData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  esvisto: string = 'novisto';

  userNoti: any[] = notificaciones;

  marcarVisto() {
    if (this.esvisto == 'novisto') {
      this.esvisto = 'visto';
    } else {
      this.esvisto = 'novisto';
    }
  }

  labelbtn(){
    if (this.esvisto == 'novisto') {
      return 'Marcar como leido';
    } else {
      return 'Marcar como no leido';
    }
  }
}
