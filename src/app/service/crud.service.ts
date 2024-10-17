import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  fullUrl = environment.apiUrl;
  currentuser: any;

  constructor(private http: HttpClient, public router: Router) {}
  //Methode Http
  post(hote: string, gert: any) {
    const $request = this.gettokenparams(localStorage.getItem('access_token'));
    const url = this.fullUrl + hote;
    return this.http.post(url, gert, $request);
  }

  put(hote: string, gert: any, id: any) {
    const $request = this.gettokenparams(localStorage.getItem('access_token'));
    const url = this.fullUrl + hote + id;
    return this.http.put(url, gert, $request);
  }

  delete(hote: string, $id: any) {
    const $request = this.gettokenparams(localStorage.getItem('access_token'));
    const url = this.fullUrl + hote + $id;
    return this.http.delete(url, $request);
  }
  get(hote: string) {
    const $request = this.gettokenparams(localStorage.getItem('access_token'));
    const url = this.fullUrl + hote;
    return this.http.get(url, $request);
  }
  getById(hote: string, $id: any) {
    const $request = this.gettokenparams(localStorage.getItem('access_token'));
    const url = this.fullUrl + hote + $id;
    return this.http.get(url, $request);
  }
  //search name
  search(hote: string, formData: string) {
    const url = this.fullUrl + hote + formData;
    const $request = this.gettokenparams(localStorage.getItem('access_token'));
    return this.http.get(url, $request);
  }
  //Login
  setcurrentuser($data: any) {
    this.currentuser = $data;
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
  doLogout() {
    this.post('/logout', {}).subscribe({
      next(data) {
        localStorage.clear();
        this.router.navigate(['users/login']);
        console.log('logout');
      },
      error(error) {
        localStorage.clear();
        this.router.navigate(['users/login']);
        console.log(error);
      },
    });
  }

  setlocalstorage($data: any) {
    localStorage.setItem('access_token', $data.access_token);
    localStorage.setItem('prenom', $data.user.prenom);
    localStorage.setItem('nom', $data.user.nom);
    localStorage.setItem('sexe', $data.user.sexe);
    localStorage.setItem('photo', $data.user.photo);
    localStorage.setItem('iduser', $data.user.id_inscription);
    localStorage.setItem('type_compte', $data.user.type_compte);
    localStorage.setItem('is_admin', $data.user.is_admin);
  }

  gettokenparams($token: any) {
    const headers = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${$token}`,
    });
    const requestOptions = { headers: headers };
    return requestOptions;
  }

  getcurrentday() {
    var mycurrentdate = new Date();
    var currentmonth = mycurrentdate.getMonth() + 1;
    var currentyear = mycurrentdate.getFullYear();
    var currentday = mycurrentdate.getDate();
    var currentdate = currentyear + '-' + currentmonth + '-' + currentday;
    return currentdate;
  }
}
