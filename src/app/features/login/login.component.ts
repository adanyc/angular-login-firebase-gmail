import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authError = '';

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
  ) { }

  async handlerSubmit() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }

    const { email, password } = this.form.value;
    await this.login(email, password);
    this.router.navigateByUrl('/home');
  }

  async login(email: string, password: string) {
    try {
      await this.fireAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      this.authError = `${error}`;
    }
  }

  get isInvalidEmail() {
    const emailControl = this.form.controls.email;

    return emailControl.touched && emailControl.invalid;

    // Otra forma de hacerlo:
    // Antes se tendria que crear una variable submitted iniciada en false y
    // cambiarla a true en el subit
    // return (emailControl.touched || this.submitted) && emailControl.errors?.required;
  }

  get isInvalidPassword() {
    const passwordControl = this.form.controls.password;

    return passwordControl.touched && passwordControl.invalid;
  }

  async signinWithGoogle() {
    await this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(credential => {
        const { user } = credential;

        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigateByUrl('/home')
        }
      })
      .catch(error => {
        this.authError = `${error}`;
      });
  }
}
