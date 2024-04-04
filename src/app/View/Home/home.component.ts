import { Component } from '@angular/core';
import { notificaciones } from '../../Models/librosData';
import { librosData } from '../../Models/librosData';
import { LibroEntitie } from '../../Models/Entities/LibroEntities.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  esvisto: string = 'novisto';
  userNoti: any[] = notificaciones;
  libros: LibroEntitie[] = [];
  librosfil: LibroEntitie[] = [];

  busqueda: string = '';

  ngOnInit() {
    this.libros = librosData;
    this.librosfil = this.libros;
  }

  onFilter() {
    //console.log(this.busqueda);
    if (this.busqueda == '') {
      this.libros = librosData;
      this.librosfil = this.libros;
      //console.log(this.librosfil);
    } else {
      this.librosfil = this.libros.filter((libro) => {
        return (
          libro.nombreLibro
            .toLowerCase()
            .includes(this.busqueda.toLowerCase()) ||
          libro.autorLibro.toLowerCase().includes(this.busqueda.toLowerCase())
        );
      });
      //console.log(this.librosfil);
    }
  }

  deleteNoti( index: number){
    this.userNoti.splice(index, 1);
  }

  marcarVisto(index:number){
    this.userNoti[index].leida = !this.userNoti[index].leida;
  }

  leida(visto: boolean): string {
    return visto ? 'visto' : 'novisto';
  }
  hayNotificaciones(){
    return this.userNoti.length > 0;
  }

  labelbtn() {
    if (this.esvisto == 'novisto') {
      return 'Marcar como leido';
    } else {
      return 'Marcar como no leido';
    }
  }
}
