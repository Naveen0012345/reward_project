// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { BusinessComponent } from './business/business.component'; // Import BusinessComponent
import { OffersComponent } from './offers/offers.component'; // Import BusinessComponent
import { ManageOffersComponent } from './manage-offers/manage-offers.component'; 

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'business', component: BusinessComponent }, // Add route for business page
  { path: 'offers', component: OffersComponent }, // Add route for business page
  { path: 'manage-offers', component: ManageOffersComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } // Redirect any unknown routes to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
