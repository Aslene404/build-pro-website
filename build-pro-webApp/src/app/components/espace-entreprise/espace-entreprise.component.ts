import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { EntreprisesService } from 'src/app/shared/entreprise.service';
import { IApiResponse } from 'src/app/shared/models/api-response.model';
import { IEntreprise } from 'src/app/shared/models/entreprise.model';

@Component({
  selector: 'app-espace-entreprise',
  templateUrl: './espace-entreprise.component.html',
  styleUrls: ['./espace-entreprise.component.css']
})
export class EspaceEntrepriseComponent implements OnInit {
  private subscribtion;
  public ourEntreprise:IEntreprise [];
  dataSource: MatTableDataSource<IEntreprise>
  constructor(private entrepriseService: EntreprisesService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllEntreprise
  }
  getAllEntreprise() {
    this.subscribtion = this.entrepriseService.getAllEntreprise()
      .subscribe(
        {
          next: (response: IApiResponse) => {
            this.ourEntreprise = response.payload;
            this.dataSource = new MatTableDataSource(this.ourEntreprise);
            this.snackBar.open(response.message, "Close");
          },
          error: error => {
            this.snackBar.open(error.message, 'Close');
          },
          complete: () => console.log
        });
  }
  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.ourEntreprise)
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
