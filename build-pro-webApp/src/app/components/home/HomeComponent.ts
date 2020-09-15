import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/user/user.model';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: IUser;
  constructor(private router:Router,private authenticationService:AuthenticationService) { 
    this.authenticationService.currentUser.subscribe(tmpUser=>this.currentUser=tmpUser);
  }

  ngOnInit(): void {
    this.currentUser= JSON.parse(localStorage.getItem('currentUser'));
  }
  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/front/login']);
  }


}
