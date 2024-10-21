import { Component, OnInit } from '@angular/core';
import { InformeService } from '../../service/informe.service';
import { CrudService } from '../../service/crud.service';
import { PanierService } from '../../service/panier.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/notification';
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
  public commandeForm!: FormGroup;

  constructor(
    public informe: InformeService,
    public crud: CrudService,
    public panierService: PanierService,
    private formBuilder: FormBuilder,
    public notifyservice: NotificationService
  ) {}

  ngOnInit(): void {
    this.AutomatiseCaroussel();
    this.getproduit(this.urlpost);
    this.initaddcommande();
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

  initaddcommande() {
    this.commandeForm = this.formBuilder.group({
      telephone: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
    });
  }
  ajoutPanier($produit: any) {
    this.panierService.getproprio($produit);
  }

  commander() {
    this.commandeForm.controls['nom'].setValue($('#nom').val());
    this.commandeForm.controls['prenom'].setValue($('#prenom').val());
    this.commandeForm.controls['telephone'].setValue($('#telephone').val());
    this.commandeForm.controls['adresse'].setValue($('#adresse').val());
    if (this.commandeForm.invalid) {
      this.notifyservice.onError('Veuillez remplir tout les champs');
    }
    if (this.commandeForm.valid) {
      this.panierService.commandeForm = this.commandeForm;
      this.panierService.commander();
    }
  }

  resetvalue() {
    $('#nom').val('');
    $('#prenom').val('');
    $('#telephone').val('');
    $('#adresse').val('');
  }
  retour() {
    this.panierService?.showpanier('ok');
  }
  annuler() {
    this.resetvalue();
    this.panierService?.reset();
  }
}
