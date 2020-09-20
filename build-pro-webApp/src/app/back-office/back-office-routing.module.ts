import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackDevisComponent } from './back-devis/back-devis.component';
import { BackHomeComponent } from './back-home/back-home.component';
import { BackLandpageComponent } from './back-landpage/back-landpage.component';
import { BackMessagesComponent } from './back-messages/back-messages.component';

const routes: Routes = [{
    
  path: '', component: BackLandpageComponent,
  children: [
    {
      path: 'home',
      component: BackHomeComponent
    },


    {
      path: 'messages',
      component: BackMessagesComponent
    },
    {
      path: 'devis',
      component: BackDevisComponent
    },

    { path: '**', redirectTo: 'home', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule { }
