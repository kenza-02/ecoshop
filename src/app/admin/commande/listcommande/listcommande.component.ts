import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../../service/crud.service';
import { InformeService } from '../../../service/informe.service';
import { NotificationService } from '../../../shared/notification';

@Component({
  selector: 'app-listcommande',
  templateUrl: './listcommande.component.html',
  styleUrl: './listcommande.component.css',
})
export class ListcommandeComponent implements OnInit {
  commande: any;
  loardcommande: boolean = false;
  detailpanier: any;
  url = '/commande';
  typestatut = ['En attente', 'Livrer'];
  affichedetail: any;
  currentcommande: any;
  loardstatut: boolean = false;
  public addfactureForm!: FormGroup;
  montantrestant: any;
  currentindex: any;
  searchcomma = '';

  constructor(
    private formBuilder: FormBuilder,
    public crud: CrudService,
    public service: InformeService,
    public notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.getpanier(this.url);
    this.initaddfacture();
  }
  getpanier($url: any) {
    this.loardcommande = false;
    this.commande = undefined;
    this.crud.get($url).then((value) => {
      this.commande = value.data;
      if (this.commande[0]) {
        this.loardcommande = true;
      }
    });
  }
  showdetail($item: any, $index: any) {
    this.affichedetail = 'ok';
    this.currentindex = $index;
    this.currentcommande = $item;
    this.detailpanier = undefined;
    this.crud.search('/panier?commande', $item.id).then((value) => {
      this.detailpanier = value.data;
    });
  }
  reset() {
    this.currentcommande = undefined;
    this.detailpanier = undefined;
    this.affichedetail = undefined;
  }
  changestat($val: any) {
    this.loardstatut = true;
    const fd = this.currentcommande;
    fd.statut = $val;
    this.crud
      .put(this.url + '/', fd, this.currentcommande.id)
      .then((data) => {
        this.loardstatut = false;
        this.currentcommande.statut = this.typestatut[1];
      })
      .catch((error) => {
        this.loardstatut = false;
        this.service.shownotifier('ERROR');
      });
  }
  initaddfacture() {
    this.addfactureForm = this.formBuilder.group({
      montant_recu: ['', Validators.required],
    });
    this.montantrestant = undefined;
    this.service.closeModal('#factureModal');
  }
  verifymontant($form: any) {
    var $montant = $form.value.montant_recu;
    if (
      $montant > this.currentcommande.total ||
      $montant == this.currentcommande.total
    ) {
      this.montantrestant = $montant - this.currentcommande.total;
    }
    if ($montant < this.currentcommande.total) {
      this.notify.onError(
        'Le montant reçu est inférieur au prix total des articles'
      );
      $form.controls['montant_recu'].setValue('');
      this.montantrestant = undefined;
    }
  }
  save_facture() {
    this.loardstatut = true;
    const formValue = this.addfactureForm.value;
    formValue.montant_restant = this.montantrestant;
    formValue.commande = this.currentcommande.id;
    formValue.nomClient = this.currentcommande.nom;
    formValue.prenomClient = this.currentcommande.prenom;
    formValue.telClient = this.currentcommande.telephone;
    formValue.montant_a_payer = this.currentcommande.total;
    formValue.dateCommande = this.currentcommande.date;
    formValue.adresseClient = this.currentcommande.adresse;
    formValue.date = new Date();
    this.crud
      .post('/facture', formValue)
      .then((value) => {
        this.loardstatut = false;
        this.currentcommande.facture = value.data;
        this.detailpanier.facture = value.data;
        this.initaddfacture();
        this.service.shownotifier('SUCCESS');
      })
      .catch((error) => {
        this.loardstatut = false;
        this.service.shownotifier('ERROR');
      });
  }
  deletecommande() {
    this.loardstatut = true;
    this.crud
      .delete(this.url + '/', this.currentcommande.id)
      .then((data) => {
        this.loardstatut = false;
        this.service.closeModal('#deletecommandeModal');
        this.commande.splice(this.currentindex, 1);
        this.affichedetail = undefined;
        this.service.shownotifier('SUCCESS');
      })
      .catch((error) => {
        this.loardstatut = false;
        this.service.closeModal('#deletecommandeModal');
        this.service.shownotifier('ERROR');
      });
  }
}
