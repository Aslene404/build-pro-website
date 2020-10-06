import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from "./components/home/HomeComponent";
import { NavbarComponent } from "./components/navbar/navbar.component";

import { AboutComponent } from './components/about/about.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { FooterComponent } from './components/footer/footer.component';
import { PartenairesComponent } from './components/partenaires/partenaires.component';
import { UserLogoutComponent } from './shared/user/user-logout/user-logout.component';
import { MaterialModule } from './shared/material/material.module';
import { SigninComponent } from './shared/user/signin/front-singin.component';
import { FrontSingupComponent } from './shared/user/front-singup/front-singup.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './shared/user/user.service';
import { JwtInterceptor } from './shared/helpers/jwt.interceptor';
import { ErrorInterceptor } from './shared/helpers/error.interceptor';
import { DevisFormComponent } from './components/devis-form/devis-form.component';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RouterModule } from '@angular/router';
import { EntrepriseProfileComponent } from './components/entreprise-profile/entreprise-profile.component';
import { EntrepriseAddComponent } from './components/entreprise-add/entreprise-add.component';
import { EntrepriseUpdateComponent } from './components/entreprise-update/entreprise-update.component';
//Angular Material Components

@NgModule({
  declarations: [
    SigninComponent,
    UserLogoutComponent,
    FrontSingupComponent,
    AppComponent,
    HomeComponent,
    AboutComponent,
    BlogComponent,
    ContactComponent,
    PortfolioComponent,
    FeedbackComponent,
    FooterComponent,
    PartenairesComponent,
    NavbarComponent,
    DevisFormComponent,
    EntrepriseProfileComponent,
    EntrepriseAddComponent,
    EntrepriseUpdateComponent

  ],
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    MaterialModule,
    MatCardModule,
    FormsModule,
    
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
