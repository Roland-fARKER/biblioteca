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
  selector: 'editorial-panel',
  templateUrl: './editoriales.html',
  styleUrls: ['./editoriales.css'],
  providers: [ConfirmationService, MessageService],
})
export class EditorialesPad implements OnInit {
  editoriales: any[] = [];
  hidenFormEd: boolean = false;
  hidenEditEd: boolean = false;
  editorialForm: FormGroup;
  editForm: FormGroup;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private firestore: Firestore,
    private fb: FormBuilder
  ) {
    this.editorialForm = this.fb.group({
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
    this.obtenerEditoriales();
  }

  async obtenerEditoriales() {
    console.log('Obtener editoriales');
    try {
      const editorialesSnapshot = await getDocs(
        collection(this.firestore, 'Editoriales')
      );
      this.editoriales = editorialesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(this.editoriales);
    } catch (error) {
      console.error('Error obteniendo editoriales:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail:
          'Error obteniendo editoriales. Verifica las reglas de seguridad de Firestore.',
      });
    }
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async agregarEditorial() {
    if (this.editorialForm.valid) {
      try {
        const editorialData = {
          Nombre: this.capitalizeFirstLetter(this.editorialForm.value.Nombre),
          pais: this.editorialForm.value.pais,
        };
        await addDoc(collection(this.firestore, 'Editoriales'), editorialData);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Editorial agregada exitosamente',
        });
        this.hidenFormEd = false;
        this.obtenerEditoriales();
        this.editorialForm.reset();
      } catch (error) {
        console.error('Error agregando editorial:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error agregando editorial. Intente de nuevo más tarde.',
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

  async eliminarEditorial(id: string) {
    try {
      this.confirmationService.confirm({
        message: '¿Estás seguro de que quieres eliminar esta editorial?',
        header: 'Eliminar Editorial.',
        accept: async () => {
          await deleteDoc(doc(this.firestore, 'Editoriales', id));
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Editorial eliminada exitosamente',
          });
          this.obtenerEditoriales();
        },
        acceptIcon: 'fas fa-trash-alt',
      });
    } catch (error) {
      console.error('Error eliminando editorial:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error eliminando editorial. Intente de nuevo más tarde.',
      });
    }
  }

  editarEditorialModal(editorial: any) {
    this.editForm.patchValue({
      id: editorial.id,
      Nombre: editorial.Nombre,
      pais: editorial.pais,
    });
    this.hidenEditEd = true;
  }

  async editarEditorial() {
    const idControl = this.editForm.get('id');
    const nombreControl = this.editForm.get('Nombre');
    const paisControl = this.editForm.get('pais');
  
    if (idControl && nombreControl && paisControl) {
      const idValue = idControl.value;
      const nombreEdi = nombreControl.value;
      const paisEdi = paisControl.value;
  
      try {
        await setDoc(doc(this.firestore, `Editoriales/${idValue}`), {
          Nombre: nombreEdi,
          pais: paisEdi,
        });
        console.log('Documento actualizado correctamente');
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Editorial actualizada exitosamente',
        });
      } catch (error) {
        console.error('Error al actualizar el documento:', error);
      }
    } else {
      console.error('Error: El formulario no está completo');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al actualizar. Intente de nuevo más tarde.',
      });
    }
    this.hidenEditEd = false;
    this.obtenerEditoriales();
  }
}
