import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  async signOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
}
