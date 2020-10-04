import { Component, OnInit ,Output, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventEmitter } from '@angular/core';
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
  @Output() EntrepriseAdded: EventEmitter<IEntreprise> = new EventEmitter();
  @Output() EntrepriseUpdate: EventEmitter<IEntreprise> = new EventEmitter();
  @Input() currentEntreprise: IEntreprise;
  @Input() context: string;
 
servicesForm:FormGroup;
entrepriseForm:FormGroup;
currentUser: IUser;
existUser: IUser;
  constructor(private _formBuilder: FormBuilder,
    private entreprisesService: EntreprisesService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.currentEntreprise = { 
      _id: '', 
      name: '', 
      about: '', 
      email: '', 
      phone: '',
      fb: '',
      website: '', 
      
    };

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
  action() {
    if (this.context === 'ADD') {
      this.send();
    } else if (this.context === 'UPDATE') {
         let id = this.currentEntreprise._id;
      this.updateEntrepriseAPI(id, this.entrepriseForm.value);
    }
  }
  updateEntrepriseAPI(id, tmpEntreprise) {
    this.entreprisesService.updateEntreprise(id, tmpEntreprise).subscribe({
      next: (response: IApiResponse) => {
        this.snackBar.open(response.message, 'Close');
        this.EntrepriseUpdate.emit(tmpEntreprise);
      },
      error: (error) => this.snackBar.open(error.message, 'Close'),
      complete: () => this.EntrepriseUpdate.emit(tmpEntreprise)
    });
    this.entrepriseForm.reset();
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
  ngOnChanges() {
    if (this.context === 'UPDATE') {
      this.entrepriseForm = this._formBuilder.group({
        name: this.currentEntreprise.name,
        about: this.currentEntreprise.about,
        email: this.currentEntreprise.email,
        phone:this.currentEntreprise.phone,
        fb: this.currentEntreprise.fb,
        web: this.currentEntreprise.website

      });

      
    }
  }

  refresh(event) {
    this.snackBar.open('Entreprise logo Upladed & Updated Successfulluy','Close');
    this.EntrepriseUpdate.emit();
  }
}



function getcurrentUser(): IUser {
  return JSON.parse(localStorage.getItem('currentUser'));
}
