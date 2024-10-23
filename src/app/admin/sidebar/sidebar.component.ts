import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CrudService } from '../../service/crud.service';
import { InformeService } from '../../service/informe.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  mymenu = [
    {
      nom: 'Produit',
      url: 'produit',
      icone: 'fad fa-store bg-gray-100 tx-primary tx-20',
    },
    {
      nom: 'Commandes',
      url: 'commande',
      icone: 'fad fa-bags-shopping bg-gray-100 tx-primary tx-20',
    },
    {
      nom: 'Contact',
      url: 'contact',
      icone: 'fad fa-address-book bg-gray-100 tx-primary tx-20',
    },
  ];
  constructor(
    public authService: CrudService,
    public myinforme: InformeService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService.doLogout();
  }
}
