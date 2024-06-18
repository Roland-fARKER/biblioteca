import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';

//componentes
import { LoginComponent } from './View/Account/login/login.component';
import { ProfileComponent } from './View/Account/Profile/profile.component';
import { HomeComponent } from './View/Home/home.component';
import { Animations3dComponent } from './View/animations3d/animations3d.component';
import { ResultadosComponent } from './View/Home/resultados/resultados.component';
import { FooterComponent } from './View/Home/footer/footer.component';
import { DetalleComponent } from './View/Home/detalle/detalle.component';
import { AdminPanel } from '../Admin/adminpanel.component';
import { LoaderComponent } from './loader/loader.component';
import { AutoresPad } from '../Admin/Autores/autores';
import { EditorialesPad } from '../Admin/editoriales/editoriales';

//primeng
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { CalendarModule } from 'primeng/calendar';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';

// Firebase configuration
import { environment } from '../environments/environment';  // Asegúrate de tener la configuración de Firebase en environment.ts

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    HomeComponent,
    Animations3dComponent,
    ResultadosComponent,
    FooterComponent,
    DetalleComponent,
    AdminPanel,
    LoaderComponent,
    AutoresPad,
    EditorialesPad
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    ButtonModule,
    DividerModule,
    BadgeModule,
    OverlayPanelModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ToastModule,
    FormsModule,
    TagModule,
    CalendarModule,
    TabViewModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    ReactiveFormsModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
