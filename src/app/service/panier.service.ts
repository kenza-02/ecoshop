import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrudService } from './crud.service';
import { InformeService } from './informe.service';
import { NotificationService } from '../shared/notification';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  valeurproprio: any = [];
  total = 0;
  public commandeForm!: FormGroup;
  statut: boolean = false;
  affichepanier: any;
  currentcommande: any;

  constructor(
    public crud: CrudService,
    public service: InformeService,
    public notify: NotificationService
  ) {}

  getproprio($val: any) {
    var val = 'test';
    if (this.valeurproprio[0]) {
      for (const [i, item] of this.valeurproprio.entries()) {
        if (item.id == $val.id) {
          val = 'okk';
          this.removevalue(i);
        }
      }
      if (val != 'okk') {
        this.pushvalu($val);
      }
    }
    if (!this.valeurproprio[0]) {
      if (val == 'test') {
        this.pushvalu($val);
      }
    }
  }
  pushvalu($val: any) {
    this.valeurproprio.unshift($val);
    this.valeurproprio[0].quantitedem = 1;
    this.valeurproprio[0].soustotal = this.valeurproprio[0].prix;
    this.calcultotal();
  }
  removevalue(i: any) {
    this.valeurproprio[i].soustotal -= this.valeurproprio[i].prix;
    this.valeurproprio.splice(i, 1);
    this.calcultotal();
  }

  actionbtn($name: any, $i: any) {
    if ($name == 'plus') {
      this.valeurproprio[$i].quantitedem += 1;
      this.valeurproprio[$i].soustotal += this.valeurproprio[$i].prix;
      this.calcultotal();
    }
    if ($name == 'moins') {
      if (this.valeurproprio[$i].quantitedem > 1) {
        this.valeurproprio[$i].quantitedem -= 1;
        this.valeurproprio[$i].soustotal -= this.valeurproprio[$i].prix;
        this.calcultotal();
      }
    }
  }
  calcultotal() {
    this.total = 0;
    if (this.valeurproprio[0]) {
      for (let item of this.valeurproprio) {
        this.total += item.soustotal;
      }
    }
  }
  reset() {
    this.total = 0;
    this.valeurproprio = [];
    this.statut = false;
    this.affichepanier = undefined;
  }
  showpanier($name?: any) {
    if (this.valeurproprio[0]) {
      this.affichepanier = 'ok';
    }
    if ($name) {
      this.affichepanier = undefined;
    }
  }
  commander() {
    this.statut = true;
    const fd = new FormData();
    this.commandeForm.value.nbcommande = this.valeurproprio.length;
    this.commandeForm.value.total = this.total;
    const formValue = {
      nbcommande: this.commandeForm.value.nbcommande,
      total: this.commandeForm.value.total,
      prenom: this.commandeForm.value.prenom,
      nom: this.commandeForm.value.nom,
      telephone: this.commandeForm.value.telephone,
      adresse: this.commandeForm.value.adresse,
    };
    //store commande
    this.crud
      .post('/commande', formValue)
      .then((value) => {
        this.service.shownotifier('SUCCESS');
        this.currentcommande = value.data.id;
        for (let i = 0; i < this.valeurproprio.length; i++) {
          const myformValue = {
            produit: this.valeurproprio[i].id,
            nomProduit: this.valeurproprio[i].nom,
            imgProduit: this.valeurproprio[i].image,
            prixProduit: this.valeurproprio[i].prix,
            quantite: this.valeurproprio[i].quantitedem,
            sous_total: this.valeurproprio[i].soustotal,
          };
          this.addtoPanier(myformValue);
        }
        this.reset();
      })
      .catch((error) => {
        this.service.shownotifier('ERROR');
        this.statut = false;
      });
  }
  addtoPanier($data: any) {
    const formValue = {
      commande: this.currentcommande,
      produit: $data.produit,
      nomProduit: $data.nomProduit,
      imgProduit: $data.imgProduit,
      prixProduit: $data.prixProduit,
      quantite: $data.quantite,
      sous_total: $data.sous_total,
    };
    //store panier
    this.crud.post('/panier', formValue);
  }
}
