import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = false;
  fightDetails: any;

  constructor() { }

  ngOnInit(): void { }

  isLoading(loading: boolean) {
    this.loading = loading;
  }
}
