import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// SHared Module

//COMPONENTS
import { NotFoundComponent } from './not-found/not-found.component';

const appRoute: Routes = [{ path: '**', component: NotFoundComponent }];

@NgModule({
  imports: [RouterModule.forChild(appRoute)],
  declarations: [NotFoundComponent],
})
export class NotFoundModule {}
