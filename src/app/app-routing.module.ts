import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './View/Account/login/login.component';
import { ProfileComponent } from './View/Account/Profile/profile.component';
import { HomeComponent } from './View/Home/home.component';
import { DetalleComponent } from './View/Home/detalle/detalle.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Profile', component: ProfileComponent },
  {path: 'Detalle',component: DetalleComponent },
];

export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: true });
