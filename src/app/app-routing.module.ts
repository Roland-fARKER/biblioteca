import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './View/Account/login/login.component';
import { ProfileComponent } from './View/Account/Profile/profile.component';
import { HomeComponent } from './View/Home/home.component';
import { DetalleComponent } from './View/Home/detalle/detalle.component';
import { AuthGuard } from '../Guards/autentication.guard';
import { Component } from '@angular/core';
import { AdminPanel } from '../Admin/adminpanel.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'Login', component: LoginComponent },
  { path: 'Profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'Detalle',component: DetalleComponent, canActivate: [AuthGuard] },
  { path: 'Administracion', component: AdminPanel } 
];

export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: true });
