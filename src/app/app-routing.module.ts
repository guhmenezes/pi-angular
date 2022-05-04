import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { CampaignComponent } from './components/pages/user/campaign/campaign.component';
import { CardsComponent } from './components/pages/user/cards/cards.component';
import { InfoComponent } from './components/pages/user/info/info.component';
import { UserComponent } from './components/pages/user/user.component';

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
    component: UserComponent
  },
  {
    path: 'promocoes',
    component: CampaignComponent
  },
  {
    path: 'cartoes',
    component: CardsComponent
  },
  {
    path: 'info',
    component: InfoComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
