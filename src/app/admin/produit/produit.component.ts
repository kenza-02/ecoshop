import { Component, OnInit } from '@angular/core';
import { AppTitleService } from '../../shared/services';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css',
})
export class ProduitComponent implements OnInit {
  mymenu = [
    {
      nom: 'Ajouter',
      action: 'add',
      icone: 'fad fa-plus bg-gray-100 tx-primary tx-20',
    },
    {
      nom: 'Liste',
      action: 'list',
      icone: 'fad fa-list bg-gray-100 tx-primary tx-20',
    },
  ];
  currentname: any;
  constructor(private title: AppTitleService) {
    this.title.setTitle('Gestion des produits');
  }
  ngOnInit(): void {
    this.currentname = this.mymenu[0].action;
  }
  setName($name: any) {
    this.currentname = $name;
  }
}
