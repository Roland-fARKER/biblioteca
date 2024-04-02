import { Component } from '@angular/core';
import { LibroEntitie } from '../../../Models/Entities/LibroEntities.model';
import { librosData } from '../../../Models/librosData';
import { MessageService } from 'primeng/api'; 

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css',
  providers:[MessageService]
})
export class ResultadosComponent {
  favoritoClass: string = 'far fa-bookmark';

  libros: LibroEntitie[] = librosData;

  constructor(private toastService: MessageService) {}

  estadisponible(id: number, ejemplares: number) {
    if (ejemplares > 0) {
      return 'Disponible';
    } else {
      //realizar consulta al servicio de pretamos para obtener la fecha de cuando estara disponible
      return 'Hasta 23/04/24';
    }
  }

  agregarFavorito(nombre: string) {
    if (this.favoritoClass == 'far fa-bookmark') {
      this.favoritoClass = 'fas fa-bookmark';
      this.toastService.add({
        severity: 'success',
        summary: 'Agregado a favoritos',
        detail: nombre,
      });
    }
    else {
      this.favoritoClass = 'far fa-bookmark';
      console.log('Eliminado de favoritos: ' + nombre);
      this.toastService.add({
        severity: 'warn',
        summary: 'Removido de Favoritos',
        detail: nombre,
      });
    }
  }
}
