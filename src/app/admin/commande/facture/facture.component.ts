import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../service/crud.service';
import { InformeService } from '../../../service/informe.service';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrl: './facture.component.css',
})
export class FactureComponent implements OnInit {
  facture: any;
  loardfacture: boolean = false;
  detailfacture: any;
  url = '/facture';
  affichedetail: any;
  currentfacture: any;
  email = 'ahmedmballo7@gmail.com';

  constructor(public crud: CrudService, public service: InformeService) {}

  ngOnInit(): void {
    this.getfacture(this.url);
  }
  getfacture($url: any) {
    this.loardfacture = false;
    this.facture = undefined;
    this.crud.get($url).then((value) => {
      this.facture = value.data;
      if (this.facture[0]) {
        this.loardfacture = true;
      }
    });
  }
  showdetail($id: any, $index: any) {
    this.service.openModal('#factureModal');
    this.currentfacture = this.facture[$index];
    this.detailfacture = undefined;
    this.crud.search('/panier?commande', $id).then((value) => {
      this.detailfacture = value.data;
    });
  }

  generatePDF() {
    var $title =
      'Facture N°' +
      this.currentfacture.id +
      '_' +
      this.currentfacture.prenomClient +
      '_' +
      this.currentfacture.nomClient;
    var data: any = document.getElementById('contentToConvert');
    html2canvas(data).then((canvas) => {
      var imgWidth = 208;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 10;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save($title + '.pdf');
    });
  }
}
