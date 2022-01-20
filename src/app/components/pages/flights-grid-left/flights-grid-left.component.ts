import { Component, OnInit } from '@angular/core';
import { LocationsService } from 'src/app/providers/locations.service';

@Component({
  selector: 'app-flights-grid-left',
  templateUrl: './flights-grid-left.component.html',
  styleUrls: ['./flights-grid-left.component.css']
})
export class FlightsGridLeftComponent implements OnInit {
  loading = false;
  fightDetails: any;

  constructor() { }

  ngOnInit(): void { }

  isLoading(loading: boolean) {
    this.loading = loading;
  }
}
