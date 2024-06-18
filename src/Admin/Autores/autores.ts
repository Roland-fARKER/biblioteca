import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  Firestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
} from '@angular/fire/firestore';

@Component({
  selector: 'autor-panel',
  templateUrl: './autores.html',
  styleUrls: ['./autores.css'], // Corrección del nombre de la propiedad
  providers: [ConfirmationService, MessageService],
})
export class AutoresPad implements OnInit {
  autores: any[] = [];
  hidenFormAu: boolean = false;
  hidenEditAu: boolean = false;
  autorForm: FormGroup;
  editForm: FormGroup;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private firestore: Firestore,
    private fb: FormBuilder
  ) {
    this.autorForm = this.fb.group({
      Nombre: ['', Validators.required],
      pais: ['', Validators.required],
    });

    this.editForm = this.fb.group({
      id: [''],
      Nombre: ['', Validators.required],
      pais: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.obtenerAutores();
  }

  async obtenerAutores() {
    console.log('Obtener autores');
    try {
      const autoresSnapshot = await getDocs(
        collection(this.firestore, 'Autores')
      );
      this.autores = autoresSnapshot.docs.map((doc) => ({
        id: doc.id, // Obtiene el ID del documento
        ...doc.data(), // Obtiene los datos del documento
      }));
      console.log(this.autores);
    } catch (error) {
      console.error('Error obteniendo autores:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail:
          'Error obteniendo autores. Verifica las reglas de seguridad de Firestore.',
      });
    }
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async agregarAutor() {
    if (this.autorForm.valid) {
      try {
        const autorData = {
          Nombre: this.capitalizeFirstLetter(this.autorForm.value.Nombre),
          pais: this.autorForm.value.pais,
        };
        await addDoc(collection(this.firestore, 'Autores'), autorData);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Autor agregado exitosamente',
        });
        this.hidenFormAu = false;
        this.obtenerAutores(); // Actualizar la lista de autores
        this.autorForm.reset(); // Resetear el formulario
      } catch (error) {
        console.error('Error agregando autor:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error agregando autor. Intente de nuevo más tarde.',
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

  async eliminarAutor(id: string) {
    try {
      this.confirmationService.confirm({
        message: '¿Estás seguro de que quieres eliminar este autor?',
        header: 'Eliminar Autor.',
        accept: async () => {
          await deleteDoc(doc(this.firestore, 'Autores', id));
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Autor eliminado exitosamente',
          });
          this.obtenerAutores(); // Actualizar la lista de autores
        },
        acceptIcon: 'fas fa-trash-alt',
      });
    } catch (error) {
      console.error('Error eliminando autor:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error eliminando autor. Intente de nuevo más tarde.',
      });
    }
  }

  editarAutorModal(autor: any) {
    this.editForm.patchValue({
      id: autor.id,
      Nombre: autor.Nombre,
      pais: autor.pais,
    });
    this.hidenEditAu = true;
  }

  async editarAutor() {
    const idControl = this.editForm.get('id');
    const nombreControl = this.editForm.get('Nombre');
    const paisControl = this.editForm.get('pais');
  
    if (idControl && nombreControl && paisControl) {
      const idValue = idControl.value;
      const nombreEdi = nombreControl.value;
      const paisEdi = paisControl.value;
  
      try {
        await setDoc(doc(this.firestore, `Autores/${idValue}`), {
          Nombre: nombreEdi,
          pais: paisEdi,
        });
        console.log('Documento actualizado correctamente');
        this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Autor eliminado exitosamente',
          });
      } catch (error) {
        console.error('Error al actualizar el documento:', error);
        // Manejo de errores
      }
    } else {
      console.error('Error: El formulario no está completo');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al actualizar. Intente de nuevo más tarde.',
      });
    }
    this.hidenEditAu = false;
  }
  
}
