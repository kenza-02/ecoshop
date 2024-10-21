import { Component, OnInit } from '@angular/core';
import { InformeService } from '../../service/informe.service';
import { CrudService } from '../../service/crud.service';
declare var $: any;

@Component({
  selector: 'app-sideportail',
  templateUrl: './sideportail.component.html',
  styleUrl: './sideportail.component.css',
})
export class SideportailComponent implements OnInit {
  listimgaccueil = [
    { url: 'ac1.avif', name: 'Des livres écologiques' },
    { url: 'ac2.avif', name: 'Les meilleurs auteurs' },
    { url: 'ac3.avif', name: "Aimer l'écologie" },
    { url: 'ac4.avif', name: 'Ressourcez vous avec des prix imbattables' },
  ];
  urlpost = '/produit';
  produit: any;
  loarding: boolean = false;
  constructor(public informe: InformeService, public crud: CrudService) {}

  ngOnInit(): void {
    this.AutomatiseCaroussel();
    this.getproduit(this.urlpost);
  }
  AutomatiseCaroussel() {
    $(document).ready(function () {
      $('.carousel').carousel({
        interval: 1200,
      });
    });
  }
  getproduit(url: string) {
    this.loarding = false;
    this.produit = undefined;
    this.crud.get(url).then((value) => {
      this.produit = value.data;
      if (this.produit[0]) {
        this.loarding = true;
      }
    });
  }
}
