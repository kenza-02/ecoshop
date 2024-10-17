import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideportailComponent } from './sideportail/sideportail.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const appRoute: Routes = [{ path: '', component: SideportailComponent }];

@NgModule({
  declarations: [SideportailComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(appRoute)],
})
export class PortailModule {}
