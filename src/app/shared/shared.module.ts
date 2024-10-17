import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgxPaginationModule,
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
