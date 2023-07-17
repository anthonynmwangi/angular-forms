import { Component } from '@angular/core';
import { UserSettings } from '../data/user-settings';
import { NgForm, NgModel } from '@angular/forms';
import { DataService } from '../data/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent {

  constructor(private dataService: DataService){}

  originalUserSettings : UserSettings = {
    name: null,
    emailOffers: null,
    interfaceStyle: null,
    subscriptionType: null,
    notes: null
  }

  subscriptionTypes!: Observable<string[]>;
  // subscriptionTypes = ['one', 'two', 'three'];

  postError:boolean = false;
  postErrorMessage:string = '';

  userSettings: UserSettings = { ...this.originalUserSettings };

  onBlur(field:NgModel){
    console.log('On leaving ' + field.name + ' field is '+ field.value);
    
  }

  ngOnInit(){
    this.subscriptionTypes = this.dataService.getSubscriptionTypes() 
  }

  onSubmit(form:NgForm){
    console.log('Form status: ' + form.valid);
    if(form.valid){
      this.dataService.postUserSettingsForm(this.userSettings).subscribe({
        next: result => console.log('success: ', result),
        error: errorResponse => this.onHttpError(errorResponse)
      });
    }else{
      this.postError = true;
      this.postErrorMessage = "Please fix the above errors";
    }
    
  }

  onHttpError(errorResponse:any){
    console.log('error: ', errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.error.errorMessage;
  }
}
