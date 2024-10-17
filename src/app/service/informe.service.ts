import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CrudService } from './crud.service';
import { NotificationService } from '../shared/notification';

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class InformeService {
  _Subject$ = new Subject();
  _Subject2$ = new Subject();
  _Subject3$ = new Subject();
  _Subject4$ = new Subject();
  _Subjectacte$ = new Subject();
  _Subjectreact$ = new Subject();
  _Subjectval1$ = new Subject();
  _Subjectval2$ = new Subject();
  _Subjectpub$ = new Subject();
  private tab: any = [];
  _tabValue$ = new Subject();
  _tabValuesimple$ = new Subject();
  statut: boolean = false;
  updateloard: boolean = false;
  constructor(
    public crud: CrudService,
    public notifyservice: NotificationService
  ) {}

  shownotifier($params: any) {
    if ($params == 'SUCCESS') {
      this.notifyservice.onSuccess('Opération réussie');
    }
    if ($params == 'ERROR') {
      this.notifyservice.onError('Erreur execution');
    }
  }
  showmessageerror($message: any) {
    this.notifyservice.onError($message);
  }
  //Informe Object to give a new data
  emitSubject(hote: string) {
    this.crud.get(hote).subscribe((data: any) => {
      this.tab = data;
      this._Subject$.next(this.tab);
    });
  }

  //Close Modal from typescript
  closeModal(element: string) {
    $(element).modal('hide');
  }
  //Open Modal from typescript
  openModal(element: string) {
    $(element).modal('toggle');
  }

  add3(hote: string, formData: any) {
    this.statut = true;
    this.crud.post(hote, formData).subscribe({
      next: (data: any) => {
        this.statut = false;
        this.tab.unshift(data);
        this._Subject$.next(this.tab);
        this.shownotifier('SUCCESS');
      },
      error: (error) => {
        this.statut = false;
        this.shownotifier('ERROR');
      },
    });
  }

  //Method to update and informe we have a new Data if update is succeed
  update(hote: string, formData: any, id: any, hote1: string, index: any) {
    this.updateloard = true;
    this.crud.put(hote, formData, id).subscribe({
      next: (data: any) => {
        this.updateloard = false;
        this.tab[index] = data;
        this._Subject$.next(this.tab);
        this.shownotifier('SUCCESS');
      },
      error: (error) => {
        this.updateloard = false;
        this.shownotifier('ERROR');
      },
    });
  }
  //Method to add and informe we have a new Data who destroy if deleted is succeed
  delete(hote: string, $id: any, hote1: string, index: any) {
    this.crud.delete(hote, $id).subscribe({
      next: (data) => {
        this.tab.splice(index, 1);
        this._Subject$.next(this.tab);
        this.shownotifier('SUCCESS');
      },
      error: (error) => {
        this.showmessageerror("Une erreur s'est produite");
      },
    });
  }
}
