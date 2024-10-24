import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service';
import { AppTitleService } from '../../shared/services';

@Component({
  selector: 'app-contactadmin',
  templateUrl: './contactadmin.component.html',
  styleUrl: './contactadmin.component.css',
})
export class ContactadminComponent implements OnInit {
  urlmessage = '/contact';
  message: any;
  loardmessage: boolean = false;
  affichereponse: any;
  currentmessage: any;

  constructor(public crud: CrudService, public title: AppTitleService) {
    this.title.setTitle('Contact');
  }

  ngOnInit() {
    this.getmessage(this.urlmessage);
  }

  getmessage($url: any) {
    this.affichereponse = undefined;
    this.currentmessage = undefined;
    this.loardmessage = false;
    this.message = undefined;
    this.crud.get($url).then((value) => {
      this.message = value.data;
      if (this.message[0]) {
        this.loardmessage = true;
      }
    });
  }
  showmessage($name?: any) {
    this.affichereponse = undefined;
    this.currentmessage = undefined;
    if ($name) {
      this.affichereponse = 'ok';
      this.currentmessage = $name;
    }
  }
}
