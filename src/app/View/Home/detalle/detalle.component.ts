import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { librosData } from '../../../Models/librosData';
import { LibroEntitie } from '../../../Models/Entities/LibroEntities.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css',
  providers: [MessageService],
})
export class DetalleComponent {
  index: number = 0;
  libro: LibroEntitie = librosData[this.index];
  fechaSalida: Date | undefined;

  fechaEntrega: Date | undefined;

  constructor(private route: ActivatedRoute, private mesaje: MessageService) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.index = params['id'];
    });

    this.libro = librosData[this.index];
    console.log(this.libro);
  }

  grabarSolicitud() {
    this.mesaje.add({
      severity: 'info',
      summary: 'Confirmacion',
      detail: 'Solicitud de prestamo realizada',
    });
  }
}
