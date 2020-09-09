import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './shared/user/signin/front-singin.component';
import { HomeComponent } from './components/home/HomeComponent';
const routes: Routes = [{
  path: '', component: HomeComponent,
  children: [
    
    
    {
      path: 'signin', component: SigninComponent
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
