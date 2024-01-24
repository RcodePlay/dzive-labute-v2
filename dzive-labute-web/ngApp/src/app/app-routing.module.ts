import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { SubpageContentComponent } from './subpage-content/subpage-content.component';
import { Error404Component } from './error404/error404.component';
import { TloginComponent } from './tlogin/tlogin.component';
import { LoginService } from './services/login/login.service';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: SubpageContentComponent},
  {path: 'contact', component: SubpageContentComponent},
  {path: 'articles', component: ArticlesComponent},
  {path: 'login', component: LoginComponent},

  {path: 'admin', component: AdminComponent, canActivate: [() => {
    const auth = inject(LoginService)
    return auth.isAuthenticatedUser()
  }]},

  {path: 'token', component: TloginComponent},
  {path: '404', component: Error404Component},
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
