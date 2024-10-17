import { Component, OnInit } from '@angular/core';
//PROVIDERS
import { AppTitleService } from '../../shared/services';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit {
  constructor(public title: AppTitleService) {
    this.title.setTitle('Page non trouvée');
  }
  ngOnInit() {}
}
