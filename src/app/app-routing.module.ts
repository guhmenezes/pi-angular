

import { AuthGuard } from './core/services/auth.guard';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { UserComponent } from './user/components/user/user.component';
import { CampaignComponent } from './user/components/campaign/campaign.component';
import { CardsComponent } from './user/components/cards/cards.component';
import { InfoComponent } from './user/components/info/info.component';
import { CreateCampaignComponent } from './user/components/create-campaign/create-campaign.component';
import { CreateCardComponent } from './user/components/create-card/create-card.component';
import { StampComponent } from './user/components/stamp/stamp.component';
import { Error404Component } from './core/components/error404/error404.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  // {
  //   path: '',
  //   redirectTo: 'index',
  //   pathMatch: 'full',
  // },
  {
    path: 'cadastro',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: UserComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'promocoes',
    component: CampaignComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'cartoes',
    component: CardsComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'info',
    component: InfoComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'criar-promocao',
    component: CreateCampaignComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'gerar-cartao',
    component: CreateCardComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'carimbar',
    component: StampComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: Error404Component
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
