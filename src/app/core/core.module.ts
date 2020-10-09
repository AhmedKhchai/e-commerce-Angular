import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NavbarComponent, LoginComponent, HomeComponent],
  imports: [CommonModule, RouterModule.forChild([])],
  exports: [NavbarComponent],
})
export class CoreModule {}
