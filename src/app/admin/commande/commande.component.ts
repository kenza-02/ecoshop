import { Component, OnInit } from '@angular/core';
import { AppTitleService } from '../../shared/services';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css',
})
export class CommandeComponent implements OnInit {
  mymenu = [
    {
      nom: 'Liste',
      action: 'list',
      icone: 'fad fa-list bg-gray-100 tx-primary tx-20',
    },
    {
      nom: 'Facture',
      action: 'facture',
      icone: 'fad fa-envelope-open-dollar bg-gray-100 tx-primary tx-20',
    },
  ];
  currentname: any;
  constructor(private title: AppTitleService) {
    this.title.setTitle('Gestion des commandes');
  }
  ngOnInit(): void {
    this.currentname = this.mymenu[0].action;
  }
  setName($name: any) {
    this.currentname = $name;
  }
}
