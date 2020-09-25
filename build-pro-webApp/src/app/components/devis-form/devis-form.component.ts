import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from 'src/app/shared/user/user.model';


@Component({
  selector: 'app-devis-form',
  templateUrl: './devis-form.component.html',
  styleUrls: ['./devis-form.component.css']
})
export class DevisFormComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  typesOfShoes: string[] = ['Je suis un client', 'Je suis un professionnel'];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  currentUser: IUser;
  existUser: IUser;

  isEditable = false;
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Merci de saisir une valeur';
    }

    return this.email.hasError('email') ? 'Email non valide' : '';
  }

  constructor(private _formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.existUser = getcurrentUser();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    if (!this.existUser) {
      this.secondFormGroup = this._formBuilder.group({
        fullname: ['', Validators.required],
        email: ['', Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
        phone: ['', Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]+|0-9]+[0-9]+[0-9]+[0-9]')
        ])]
      });
    } else {
      this.secondFormGroup = this._formBuilder.group({
        fullname: [this.existUser.fullusername, Validators.required],
        email: [this.existUser.email, Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])],
        phone: [this.existUser.phone, Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]+|0-9]+[0-9]+[0-9]+[0-9]')
        ])]

      });
    }
    if (!this.existUser) {
      this.thirdFormGroup = this._formBuilder.group({
        fullname: ['', Validators.required],
            email: ['', Validators.compose([
              Validators.required,
              Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])],
            phone: ['', Validators.compose([
              Validators.required,
              Validators.pattern('[0-9]+|0-9]+[0-9]+[0-9]+[0-9]')
            ])]
      });
    } else {
      this.thirdFormGroup = this._formBuilder.group({
        fullname: [this.existUser.fullusername, Validators.required],
            email: [this.existUser.email, Validators.compose([
              Validators.required,
              Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])],
            phone: [this.existUser.phone, Validators.compose([
              Validators.required,
              Validators.pattern('[0-9]+|0-9]+[0-9]+[0-9]+[0-9]')
            ])],
            entreprise: ['', Validators.required],
            numregistre: ['', Validators.required]
      
    });
    }
  }

}
function getcurrentUser(): IUser {
  return JSON.parse(localStorage.getItem('currentUser'));
}
