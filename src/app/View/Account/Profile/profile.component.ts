import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'], // Corrección del nombre de la propiedad
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {
  prestamos = [
    { id: '1', nombreLibro: 'La sombra del viento', estado: 'pendiente', fechaSalida: '2021-01-05', fechaEntrega: '2021-01-10' },
    { id: '2', nombreLibro: 'Cien años de soledad', estado: 'entregado', fechaSalida: '2021-02-15', fechaEntrega: '2021-02-20' },
    { id: '3', nombreLibro: '1984', estado: 'entregado con retraso', fechaSalida: '2021-03-10', fechaEntrega: '2021-03-20' },
    { id: '4', nombreLibro: 'El código Da Vinci', estado: 'pendiente', fechaSalida: '2021-04-12', fechaEntrega: '2021-04-17' },
    { id: '5', nombreLibro: 'Harry Potter y la piedra filosofal', estado: 'entregado', fechaSalida: '2021-05-20', fechaEntrega: '2021-05-25' },
    { id: '6', nombreLibro: 'El señor de los anillos', estado: 'pendiente', fechaSalida: '2021-06-18', fechaEntrega: '2021-06-23' },
    { id: '7', nombreLibro: 'Orgullo y prejuicio', estado: 'entregado', fechaSalida: '2021-07-05', fechaEntrega: '2021-07-10' },
  ];

  currentUser: any = null;

  avataresList = [
    { id: 1, url: '../../../../assets/pictures/avatares/avatar1.webp' },
    { id: 2, url: '../../../../assets/pictures/avatares/avatar2.png' },
    { id: 3, url: '../../../../assets/pictures/avatares/avatar3.png' },
    { id: 4, url: '../../../../assets/pictures/avatares/avatar4.png' },
    { id: 5, url: '../../../../assets/pictures/avatares/avatar5.png' },
    { id: 6, url: 'https://static.vecteezy.com/system/resources/previews/007/819/617/non_2x/boy-flat-design-avatar-cartoon-using-a-cap-for-profile-picture-free-vector.jpg' },
  ];

  hidenmodal = false;

  constructor(
    private router: Router,
    private auth: Auth,
    private firestore: Firestore,
    private mensaje: MessageService,
  ) { }

  ngOnInit() {
    onAuthStateChanged(this.auth, async (user: User | null) => {
      if (user) {
        this.currentUser = user;
        const userDoc = await getDoc(doc(this.firestore, `users/${user.uid}`));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          this.currentUser = { ...this.currentUser, ...userData };
          localStorage.setItem('avatarId', this.currentUser.avatarId);
        }
      } else {
        this.currentUser = null;
      }
    });
  }

  obtenerAvatar(id: number): string {
    const avatar = this.avataresList.find(a => a.id === id);
    return avatar ? avatar.url : 'default_avatar_url'; // Cambiar 'default_avatar_url' a la URL del avatar por defecto si es necesario
  }

  logout() {
    this.router.navigate(['/Login']);
  }

  alInicio() {
    this.router.navigate(['/Home']);
  }

  getSeverity(estado: string): string {
    switch (estado) {
      case 'pendiente':
        return 'danger';
      case 'entregado':
        return 'success';
      case 'entregado con retraso':
        return 'warning';
      default:
        return 'danger';
    }
  }

  async changeAvatar(id: number) {
    try {
      await setDoc(doc(this.firestore, `users/${this.currentUser.uid}`), {
        avatarId: id,
      });

      this.mensaje.add({ severity: 'success', summary: 'Éxito', detail: 'Avatar actualizado exitosamente' });

      this.hidenmodal = false;

      window.location.reload();
    } catch (error) {
      this.mensaje.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error, intenta más tarde' });
    }
  }
}
