import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InformeService } from '../../../service/informe.service';
import { CrudService } from '../../../service/crud.service';

@Component({
  selector: 'app-ajoutproduit',
  templateUrl: './ajoutproduit.component.html',
  styleUrl: './ajoutproduit.component.css',
})
export class AjoutproduitComponent implements OnInit {
  loading = false;
  public addproduitForm!: FormGroup;
  url = '/produit';

  constructor(
    private formBuilder: FormBuilder,
    private gService: InformeService,
    public crud: CrudService
  ) {}

  ngOnInit() {
    this.initAddproduit();
  }

  initAddproduit() {
    this.addproduitForm = this.formBuilder.group({
      nom: ['', Validators.required],
      image: ['', Validators.required],
      prix: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  save_produit() {
    this.loading = true;
    this.crud
      .post(this.url, this.addproduitForm.value)
      .then((res) => {
        this.loading = false;
        this.initAddproduit();
        this.gService.shownotifier('SUCCESS');
      })
      .catch((err) => {
        this.loading = false;
        this.gService.shownotifier('ERROR');
      });
  }
}
