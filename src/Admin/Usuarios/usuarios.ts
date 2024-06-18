import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Firestore, collection, getDocs, addDoc, deleteDoc, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'usuario-panel',
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css'],
  providers: [ConfirmationService, MessageService],
})
export class UsuariosPad implements OnInit {
  usuarios: any[] = [];
  hidenFormUs: boolean = false;
  hidenEditUs: boolean = false;
  usuarioForm: FormGroup;
  editForm: FormGroup;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private firestore: Firestore,
    private fb: FormBuilder
  ) {
    this.usuarioForm = this.fb.group({
      avatarId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      role: ['', Validators.required],
    });

    this.editForm = this.fb.group({
      id: [''],
      avatarId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  async obtenerUsuarios() {
    try {
      const usuariosSnapshot = await getDocs(collection(this.firestore, 'users'));
      this.usuarios = usuariosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error obteniendo usuarios. Verifica las reglas de seguridad de Firestore.',
      });
    }
  }

  async agregarUsuario() {
    if (this.usuarioForm.valid) {
      try {
        const usuarioData = {
          avatarId: this.usuarioForm.value.avatarId,
          email: this.usuarioForm.value.email,
          name: this.usuarioForm.value.name,
          role: this.usuarioForm.value.role,
        };
        await addDoc(collection(this.firestore, 'users'), usuarioData);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Usuario agregado exitosamente',
        });
        this.hidenFormUs = false;
        this.obtenerUsuarios();
        this.usuarioForm.reset();
      } catch (error) {
        console.error('Error agregando usuario:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error agregando usuario. Intente de nuevo más tarde.',
        });
      }
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor complete el formulario correctamente',
      });
    }
  }

  async eliminarUsuario(id: string) {
    try {
      this.confirmationService.confirm({
        message: '¿Estás seguro de que quieres eliminar este usuario?',
        header: 'Eliminar Usuario.',
        accept: async () => {
          await deleteDoc(doc(this.firestore, 'users', id));
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Usuario eliminado exitosamente',
          });
          this.obtenerUsuarios();
        },
        acceptIcon: 'fas fa-trash-alt',
      });
    } catch (error) {
      console.error('Error eliminando usuario:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error eliminando usuario. Intente de nuevo más tarde.',
      });
    }
  }

  editarUsuarioModal(usuario: any) {
    this.editForm.patchValue({
      id: usuario.id,
      avatarId: usuario.avatarId,
      email: usuario.email,
      name: usuario.name,
      role: usuario.role,
    });
    this.hidenEditUs = true;
  }

  async editarUsuario() {
    const idControl = this.editForm.get('id');
    const avatarIdControl = this.editForm.get('avatarId');
    const emailControl = this.editForm.get('email');
    const nameControl = this.editForm.get('name');
    const roleControl = this.editForm.get('role');

    if (idControl && avatarIdControl && emailControl && nameControl && roleControl) {
      const idValue = idControl.value;
      const avatarIdValue = avatarIdControl.value;
      const emailValue = emailControl.value;
      const nameValue = nameControl.value;
      const roleValue = roleControl.value;

      try {
        await setDoc(doc(this.firestore, `users/${idValue}`), {
          avatarId: avatarIdValue,
          email: emailValue,
          name: nameValue,
          role: roleValue,
        });
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Usuario actualizado exitosamente',
        });
        this.obtenerUsuarios();
      } catch (error) {
        console.error('Error al actualizar el documento:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al actualizar. Intente de nuevo más tarde.',
        });
      }
    } else {
      console.error('Error: El formulario no está completo');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al actualizar. Intente de nuevo más tarde.',
      });
    }
    this.hidenEditUs = false;
  }
}
