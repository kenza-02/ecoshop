import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  declarations: [LoginComponent, ContactComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class UsersgestModule {}
