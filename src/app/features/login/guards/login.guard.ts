import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  async canActivate() {
    if (await this.isAuthenticated()) {
      this.router.navigateByUrl('/home');
      return false;
    }

    return true;
  }

  async isAuthenticated() {
    return !!(await firstValueFrom(this.auth.user));
  }
}
