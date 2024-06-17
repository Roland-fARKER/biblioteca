import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'admin-panel',
    templateUrl: './adminpanel.component.html',
    styleUrl: './adminpanel.component.css',
    providers: [ConfirmationService, MessageService],
  })

export class adminPanel{
    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
      ) {}
    
      ngOnInit() {
        //this.libros = librosData;
        //this.librosfil = this.libros;
      }
    
      onFilter() {
        //console.log(this.busqueda);
        // if (this.busqueda == '') {
        //   this.libros = librosData;
        //   this.librosfil = this.libros;
        //   //console.log(this.librosfil);
        // } else {
        //   this.librosfil = this.libros.filter((libro) => {
        //     return (
        //       libro.nombreLibro
        //         .toLowerCase()
        //         .includes(this.busqueda.toLowerCase()) ||
        //       libro.autorLibro.toLowerCase().includes(this.busqueda.toLowerCase())
        //     );
        //   });
        //   //console.log(this.librosfil);
        // }
      }
    
      deleteNoti(index: number) {
        //this.userNoti.splice(index, 1);
      }
    
      marcarVisto(index: number) {
        //this.userNoti[index].leida = !this.userNoti[index].leida;
      }
    
      leida(visto: boolean): string {
        return visto ? 'visto' : 'novisto';
      }
}