import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { HomeGuard } from './features/home/guards/home.guard';
import { LoginGuard } from './features/login/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [HomeGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule) }
    ]
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
