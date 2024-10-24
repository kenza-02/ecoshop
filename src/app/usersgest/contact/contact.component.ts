import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../service/crud.service';
import { NotificationService } from '../../shared/notification';
import { Router } from '@angular/router';
import { AppTitleService } from '../../shared/services';
import { InformeService } from '../../service/informe.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  loading: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    public crud: CrudService,
    public informe: InformeService,
    public router: Router,
    public title: AppTitleService
  ) {
    this.title.setTitle('Contact');
  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.contactForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }
  contact() {
    this.loading = true;
    this.contactForm.value.date = new Date();
    this.crud
      .post('/contact', this.contactForm.value)
      .then((res) => {
        this.loading = false;
        this.informe.shownotifier('SUCCESS');
        this.annuler();
      })
      .catch((err) => {
        this.loading = false;
        this.informe.shownotifier('ERROR');
      });
  }
  annuler() {
    this.initForm();
    this.router.navigate(['']);
  }
}
