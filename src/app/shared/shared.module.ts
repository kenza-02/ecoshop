import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NotificationModule } from './notification';
import { LoardingComponent } from './loarding/loarding.component';
import { NoDataComponent } from './no-data/no-data.component';

@NgModule({
  declarations: [LoardingComponent, NoDataComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgxPaginationModule,
    NotificationModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgxPaginationModule,
  ],
})
export class SharedModule {}
