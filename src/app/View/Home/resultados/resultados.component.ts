import { Component, Input } from '@angular/core';
import { LibroEntitie } from '../../../Models/Entities/LibroEntities.model';
import { MessageService } from 'primeng/api'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css',
  providers:[MessageService]
})
export class ResultadosComponent{
  @Input() librosIn:LibroEntitie[] = [];

  favoritoClass: string = 'far fa-bookmark';

  constructor(private toastService: MessageService, private _router:Router ) {}

  estadisponible(ejemplares: number): boolean {
    return ejemplares > 0 ;
  }

  solicitudPrestamo( index : number){
    this._router.navigate(['/Detalle'],{ queryParams: { id: index} });
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
