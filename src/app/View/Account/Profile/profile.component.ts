import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  prestamos: any[] = [
    {
      id: '1',
      nombreLibro: 'La sombra del viento',
      estado: 'pendiente',
      fechaSalida: '2021-01-05',
      fechaEntrega: '2021-01-10',
    },
    {
      id: '2',
      nombreLibro: 'Cien años de soledad',
      estado: 'entregado',
      fechaSalida: '2021-02-15',
      fechaEntrega: '2021-02-20',
    },
    {
      id: '3',
      nombreLibro: '1984',
      estado: 'entregado con retraso',
      fechaSalida: '2021-03-10',
      fechaEntrega: '2021-03-20',
    },
    {
      id: '4',
      nombreLibro: 'El código Da Vinci',
      estado: 'pendiente',
      fechaSalida: '2021-04-12',
      fechaEntrega: '2021-04-17',
    },
    {
      id: '5',
      nombreLibro: 'Harry Potter y la piedra filosofal',
      estado: 'entregado',
      fechaSalida: '2021-05-20',
      fechaEntrega: '2021-05-25',
    },
    {
      id: '6',
      nombreLibro: 'El señor de los anillos',
      estado: 'pendiente',
      fechaSalida: '2021-06-18',
      fechaEntrega: '2021-06-23',
    },
    {
      id: '7',
      nombreLibro: 'Orgullo y prejuicio',
      estado: 'entregado',
      fechaSalida: '2021-07-05',
      fechaEntrega: '2021-07-10',
    },
  ];

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/Login']);
  }

  alInicio() {
    this.router.navigate(['/Home']);
  }

  getseverty(estado: string): string {
    switch (estado) {
      case 'pendiente':
        return 'danger';
      case 'entregado':
        return 'success';
      case 'entregado con retraso':
        return 'warning';
      default:
        return 'danger';
        break;
    }
  }
}
