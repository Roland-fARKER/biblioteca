import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

//componentes
import { LoginComponent } from './View/Account/login/login.component';
import { ProfileComponent } from './View/Account/Profile/profile.component';
import { HomeComponent } from './View/Home/home.component';
@NgModule({
  declarations: [AppComponent, LoginComponent, ProfileComponent, HomeComponent],
  imports: [BrowserModule, CommonModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
