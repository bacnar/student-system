import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { OverviewComponent } from './overview/overview.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'overview', component: OverviewComponent/*, canActivate: [AuthGuard] */ },

  { path: '**', redirectTo: 'overview' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
