import { Component, OnInit, Output, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { E_projectssService } from 'src/app/shared/e_projects.service';

import { EntreprisesService } from 'src/app/shared/entreprise.service';
import { IApiResponse } from 'src/app/shared/models/api-response.model';
import { IUser } from 'src/app/shared/user/user.model';
import { IEntreprise } from 'src/app/shared/models/entreprise.model';


@Component({
  selector: 'app-entreprise-add',
  templateUrl: './entreprise-add.component.html',
  styleUrls: ['./entreprise-add.component.css']
})
export class EntrepriseAddComponent implements OnInit {




  e_projectsForm: FormGroup;
  entrepriseForm: FormGroup;
  currentUser: IUser;
  existUser: IUser;
  createdEntreprise:IEntreprise;
  constructor(private _formBuilder: FormBuilder,
    private entreprisesService: EntreprisesService,
    private e_projectsService: E_projectssService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    

    this.existUser = getcurrentUser();
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
      services: this._formBuilder.array([
        this._formBuilder.control('')
      ])


    });
    this.e_projectsForm = this._formBuilder.group({
      name: ['', Validators.required],
      photo: ['', Validators.required]



    });


  }
  get services() {
    return this.entrepriseForm.get('services') as FormArray;
  }

  addService() {
    this.services.push(this._formBuilder.control(''));
  }

  addProject() {
    var e_project;
    e_project = {
      name: this.e_projectsForm.value.name,

      entreprise: this.createdEntreprise._id 

    }
    this.e_projectsService.addE_projects(e_project).subscribe({
      next: (response: IApiResponse) => {
        this.snackBar.open(response.message, 'Close', { duration: 5000 });
      },
      error: (error) => this.snackBar.open('Unable to reach API', 'Close'),
      complete: () => this.e_projectsForm.reset()

    });
  }






  send() {
    var entreprise;
    entreprise = {
      name: this.entrepriseForm.value.name,
      about: this.entrepriseForm.value.about,
      owner: this.existUser._id,
      email: this.entrepriseForm.value.email,
      phone: this.entrepriseForm.value.phone,
      fb: this.entrepriseForm.value.fb,
      website: this.entrepriseForm.value.web,
      services: this.entrepriseForm.value.services
    }
    this.entreprisesService.addEntreprise(entreprise).subscribe({
      next: (response: IApiResponse) => {
        this.snackBar.open(response.message, 'Close', { duration: 5000 });
        this.createdEntreprise=response.payload
        
        
      },
      error: (error) => this.snackBar.open('Unable to reach API', 'Close'),
      complete: () => this.entrepriseForm.reset()

    });

  }
}


function getcurrentUser(): IUser {
  return JSON.parse(localStorage.getItem('currentUser'));
}
