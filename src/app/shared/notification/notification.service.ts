import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class NotificationService {

	constructor(public notify:ToastrService) { }


	// On Success
	onSuccess($body:string, $title = 'Success') {
		this.notify.success($body,$title);
  	}

  	// On Info
  	onInfo($body:string, $title = 'Information') {
    	this.notify.info( $body,$title);
  	}
  	
  	// On Error
  	onError($body:string, $title = 'Erreur') {
    	this.notify.error($body,$title);
  	}
  	
  	// On Warning
  	onWarning($body:string, $title = 'Warning') {
    	this.notify.warning($body,$title);
  	}
}
