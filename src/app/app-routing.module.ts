import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { CampaignComponent } from './components/pages/user/campaign/campaign.component';
import { CardsComponent } from './components/pages/user/cards/cards.component';
import { CreateCampaignComponent } from './components/pages/user/create-campaign/create-campaign.component';
import { CreateCardComponent } from './components/pages/user/create-card/create-card.component';
import { InfoComponent } from './components/pages/user/info/info.component';
import { StampComponent } from './components/pages/user/stamp/stamp.component';
import { UserComponent } from './components/pages/user/user.component';

import { AuthGuard } from './services/auth.guard';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path: 'login',
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
    canActivate: [AuthGuard]
  },
  {
    path: 'info',
    component: InfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-campaign',
    component: CreateCampaignComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'generate-card',
    component: CreateCardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'stamp',
    component: StampComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
