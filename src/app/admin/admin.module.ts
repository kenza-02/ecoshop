import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const appRoute: Routes = [{ path: '', component: SidebarComponent }];

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(appRoute)],
})
export class AdminModule {}
