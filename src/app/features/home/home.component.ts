import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: any;

  ngOnInit(): void {
    const user = localStorage.getItem('user');

    if (user) {
      this.user = JSON.parse(user);
    }
  }
}
