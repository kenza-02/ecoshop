import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NotificationService } from './shared/notification';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 1000, // 15 seconds
      closeButton: true,
      progressBar: true,
    }),
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
