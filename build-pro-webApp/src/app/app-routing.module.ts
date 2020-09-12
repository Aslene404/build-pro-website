import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './shared/user/signin/front-singin.component';
import { HomeComponent } from './components/home/HomeComponent';
const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'signin',component:SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
