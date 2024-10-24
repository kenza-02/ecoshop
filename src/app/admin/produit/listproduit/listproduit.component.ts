import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InformeService } from '../../../service/informe.service';
import { CrudService } from '../../../service/crud.service';
import { NotificationService } from '../../../shared/notification';

@Component({
  selector: 'app-listproduit',
  templateUrl: './listproduit.component.html',
  styleUrl: './listproduit.component.css',
})
export class ListproduitComponent implements OnInit {
  urlpost = '/produit';
  produit: any;
  loarding: boolean = false;
  detailproduit: any;
  idproduit: any;
  afficheupdate: any;
  del: boolean = false;
  updatestatut: boolean = false;
  public updateproduitForm!: FormGroup;
  value: any;
  searchproduit = '';

  constructor(
    private formBuilder: FormBuilder,
    public informe: InformeService,
    public crud: CrudService,
    public notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.getproduit(this.urlpost);
  }

  getproduit(url: string) {
    this.loarding = false;
    this.produit = undefined;
    this.searchproduit = '';
    this.informe.emitSubject(url);
    this.informe._Subject$.subscribe((data: any) => {
      this.produit = data;
      if (this.produit[0]) {
        this.loarding = true;
      }
    });
  }
  modifForm(data: any) {
    this.updateproduitForm = this.formBuilder.group({
      nom: [data.nom, Validators.required],
      image: [data.image, Validators.required],
      prix: [data.prix, Validators.required],
      description: [data.description, Validators.required],
    });
  }

  getId(item: any, $name: any, $i?: any) {
    this.detailproduit = item;
    this.idproduit = item.id;
    this.value = $i;
    if (this.detailproduit) {
      if ($name == 'update') {
        this.modifForm(this.detailproduit);
        this.afficheupdate = 'ok';
        this.informe.openModal('#editproduitModal');
      }
      if ($name == 'delete') {
        this.informe.openModal('#deleteproduitModal');
      }
      if ($name == 'detail') {
        this.informe.openModal('#detailproduitModal');
      }
    }
  }
  delete() {
    this.del = true;
    this.crud
      .delete(this.urlpost + '/', this.idproduit)
      .then((value: any) => {
        this.informe.shownotifier('SUCCESS');
        this.produit.splice(this.value, 1);
        this.del = false;
        this.informe.closeModal('#deleteproduitModal');
      })
      .catch(() => {
        this.notification.onError('Suppression a échouée');
        this.informe.closeModal('#deleteproduitModal');
        this.del = false;
      });
  }

  updateValue() {
    this.updatestatut = true;
    this.crud
      .put(this.urlpost + '/', this.updateproduitForm.value, this.idproduit)
      .then((value: any) => {
        this.produit[this.value] = value.data;
        this.informe.shownotifier('SUCCESS');
        this.updatestatut = false;
        this.informe.closeModal('#editproduitModal');
      })
      .catch(() => {
        this.informe.shownotifier('ERROR');
        this.updatestatut = false;
      });
  }
}
