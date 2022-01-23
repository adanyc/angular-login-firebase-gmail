import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  async canActivate() {
    if (await this.isNotAuthenticated()) {
      return this.router.navigateByUrl('/login').then(() => false);
    }

    return true;
  }

  async isNotAuthenticated() {
    return !(await firstValueFrom(this.auth.user));
  }
}
