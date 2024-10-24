import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../../service/crud.service';
import { NotificationService } from '../../shared/notification';
import { AppTitleService } from '../../shared/services';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading: boolean = false;
  currentuser: any;
  constructor(
    private formBuilder: FormBuilder,
    public crud: CrudService,
    public toastr: NotificationService,
    public router: Router,
    public title: AppTitleService
  ) {
    this.title.setTitle('Connection');
  }

  ngOnInit(): void {
    this.currentuser = this.crud.getcurrentuser();
    if (this.currentuser.nom) {
      this.router.navigate(['admin/produit']);
    }
    this.initForm();
  }
  initForm() {
    this.loginForm = this.formBuilder.group({
      mailUtilisateur: ['', [Validators.required, Validators.email]],
      motDepasse: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  login() {
    this.loading = true;
    this.crud
      .login(
        '/users',
        this.loginForm.value.mailUtilisateur,
        this.loginForm.value.motDepasse
      )
      .then((res) => {
        if (res.data.length > 0) {
          this.toastr.onInfo(
            'Bienvenue ' + res.data[0].prenom + ' ' + res.data[0].nom
          );
          this.crud.setlocalstorage(res.data[0]);
          this.router.navigate(['/admin/produit']);
          this.loading = false;
        } else {
          this.toastr.onError('Connection non valide');
          this.loading = false;
        }
      });
  }
  toggleShow() {
    if (this.loginForm.value.motDepasse) {
      var currentype = $('#password').attr('type');
      if (currentype == 'password') {
        $('#password').attr('type', 'text');
      }
      if (currentype == 'text') {
        $('#password').attr('type', 'password');
      }
    }
  }
}
