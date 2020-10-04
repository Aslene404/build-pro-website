import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EntreprisesService } from 'src/app/shared/entreprise.service';
import { IApiResponse } from 'src/app/shared/models/api-response.model';
import { IUser } from 'src/app/shared/user/user.model';

@Component({
  selector: 'app-entreprise-add',
  templateUrl: './entreprise-add.component.html',
  styleUrls: ['./entreprise-add.component.css']
})
export class EntrepriseAddComponent implements OnInit {
  
servicesForm:FormGroup;
entrepriseForm:FormGroup;
currentUser: IUser;
existUser: IUser;
  constructor(private _formBuilder: FormBuilder,
    private entreprisesService: EntreprisesService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.existUser=getcurrentUser();
    this.entrepriseForm = this._formBuilder.group({
      name: ['', Validators.required],
      about: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+|0-9]+[0-9]+[0-9]+[0-9]')
      ])],
      fb: ['', Validators.required],
      web: ['', Validators.required],
      
    });
    this.servicesForm = this._formBuilder.group({
      service: ['', Validators.required]
    });
  }
  send() {
    var entreprise;
    entreprise={
      name:this.entrepriseForm.value.name,
      about:this.entrepriseForm.value.about,
      owner:this.existUser._id,
      email:this.entrepriseForm.value.email,
      phone:this.entrepriseForm.value.phone,
      fb:this.entrepriseForm.value.fb,
      web:this.entrepriseForm.value.web,
    }
    this.entreprisesService.addEntreprise(entreprise).subscribe({
      next: (response: IApiResponse) => {
        this.snackBar.open(response.message, 'Close',{duration:5000});
      },
      error: (error) => this.snackBar.open('Unable to reach API','Close'),
      complete: () => this.entrepriseForm.reset()

    });

  }
  sendService() {
   

    
  }

}
function getcurrentUser(): IUser {
  return JSON.parse(localStorage.getItem('currentUser'));
}
