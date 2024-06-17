import { Component } from '@angular/core';
import { notificaciones } from '../../Models/librosData';
import { librosData } from '../../Models/librosData';
import { LibroEntitie } from '../../Models/Entities/LibroEntities.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [ConfirmationService, MessageService],
})
export class HomeComponent {
  esvisto: string = 'novisto';
  userNoti: any[] = notificaciones;
  libros: LibroEntitie[] = [];
  librosfil: LibroEntitie[] = [];

  busqueda: string = '';

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
  ) {}

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

  deleteNoti(index: number) {
    this.userNoti.splice(index, 1);
  }

  marcarVisto(index: number) {
    this.userNoti[index].leida = !this.userNoti[index].leida;
  }

  leida(visto: boolean): string {
    return visto ? 'visto' : 'novisto';
  }
  hayNotificaciones() {
    return this.userNoti.length > 0;
  }

  labelbtn() {
    if (this.esvisto == 'novisto') {
      return 'Marcar como leido';
    } else {
      return 'Marcar como no leido';
    }
  }

  confirm1(event: Event) {
    const currentHour = new Date().getHours();
    const detailMessage =
      currentHour >= 18 || currentHour < 6
        ? 'Buenas noches'
        : 'Ten un buen día';

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Estas seguro de cerrar la sesión ?',
      header: 'Confirmación',
      icon: 'fas fa-exclamation-triangle',
      acceptIcon: 'fas fa-door-open',
      rejectIcon: 'fas fa-times',
      rejectLabel: 'No',
      acceptLabel: 'Si',
      //rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Hasta pronto',
          detail: detailMessage,
        });

        this.logout()
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Acción cancelada',
          detail: 'Cancelaste el cierre de sesión.',
          life: 3000,
        });
      },
    });
  }

  logout() {
    // Limpiar el token de usuario al cerrar sesión
    localStorage.removeItem('userToken');
    this.router.navigate(['/Login']); // Redirigir al usuario a la página de inicio de sesión
  }
}
