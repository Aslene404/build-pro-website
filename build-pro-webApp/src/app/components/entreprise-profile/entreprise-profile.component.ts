import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { EntreprisesService } from 'src/app/shared/entreprise.service';
import { IApiResponse } from 'src/app/shared/models/api-response.model';
import { IEntreprise } from 'src/app/shared/models/entreprise.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-entreprise-profile',
  templateUrl: './entreprise-profile.component.html',
  styleUrls: ['./entreprise-profile.component.css']
})
export class EntrepriseProfileComponent implements OnInit {
  id;
  subscription;
  myEntreprise: IEntreprise;
  constructor(private route: ActivatedRoute, private _entrepriseService: EntreprisesService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
this.id= this.route.snapshot.paramMap.get("id");
console.log(this.id);
this.subscription=this._entrepriseService.getEntrepriseById(this.id)




.pipe(
  map(
    (response: IApiResponse) => response.payload

  ),
  map((entreprises: IEntreprise) => {
    
    entreprises.logo_url=`${environment.API_URL}/${entreprises.logo_url}`;
    return entreprises;
  }),
)
.subscribe({
  next: (value) => {
    
    this.myEntreprise = value
    
  },
  error: (error) => this.snackBar.open(error.message, 'Close'),
  complete: () => console.log('complete')
});
console.log(this.myEntreprise);


}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
