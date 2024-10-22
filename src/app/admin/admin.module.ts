import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProduitComponent } from './produit/produit.component';
import { CommandeComponent } from './commande/commande.component';
import { AjoutproduitComponent } from './produit/ajoutproduit/ajoutproduit.component';
import { ListproduitComponent } from './produit/listproduit/listproduit.component';
import { ListcommandeComponent } from './commande/listcommande/listcommande.component';
import { FactureComponent } from './commande/facture/facture.component';

const appRoute: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      { path: 'produit', component: ProduitComponent },
      { path: 'commande', component: CommandeComponent },
    ],
  },
];

@NgModule({
  declarations: [SidebarComponent, ProduitComponent, CommandeComponent, AjoutproduitComponent, ListproduitComponent, ListcommandeComponent, FactureComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(appRoute)],
})
export class AdminModule {}
