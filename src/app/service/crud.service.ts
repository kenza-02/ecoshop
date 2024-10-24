import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import axios from 'axios';

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
    return axios.post(url, gert);
    // return this.http.post(url, gert, $request);
  }

  put(hote: string, gert: any, id: any) {
    const $request = this.gettokenparams(localStorage.getItem('access_token'));
    const url = this.fullUrl + hote + id;
    return axios.put(url, gert);
    //return this.http.put(url, gert, $request);
  }

  delete(hote: string, $id: any) {
    const $request = this.gettokenparams(localStorage.getItem('access_token'));
    const url = this.fullUrl + hote + $id;
    return axios.delete(url);
    //return this.http.delete(url, $request);
  }
  get(hote: string) {
    const $request = this.gettokenparams(localStorage.getItem('access_token'));
    const url = this.fullUrl + hote;
    return axios.get(url);
    //return this.http.get(url, $request);
  }

  getById(hote: string, $id: any) {
    const $request = this.gettokenparams(localStorage.getItem('access_token'));
    const url = this.fullUrl + hote + $id;
    return this.http.get(url, $request);
  }
  //search name
  search(hote: string, formData: string) {
    const url = this.fullUrl + hote + '=' + `${formData}`;
    const $request = this.gettokenparams(localStorage.getItem('access_token'));
    return axios.get(url);
    // return this.http.get(url, $request);
  }
  login(hote: string, email: string, motDepasse: string) {
    const url =
      this.fullUrl +
      hote +
      '?mailUtilisateur=' +
      `${email}` +
      '&motDepasse=' +
      `${motDepasse}`;
    const $request = this.gettokenparams(localStorage.getItem('access_token'));
    return axios.get(url);
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
    localStorage.clear();
    this.router.navigate(['']);
  }

  setlocalstorage($data: any) {
    localStorage.setItem('access_token', $data.access_token);
    localStorage.setItem('prenom', $data.prenom);
    localStorage.setItem('nom', $data.nom);
  }

  gettokenparams($token: any) {
    const headers = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${$token}`,
    });
    const requestOptions = { headers: headers };
    return requestOptions;
  }

  getcurrentuser() {
    var $user = {
      nom: localStorage.getItem('nom'),
      prenom: localStorage.getItem('prenom'),
    };
    return $user;
    //return this.currentuser;
  }
}
