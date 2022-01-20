import { Component, OnInit } from '@angular/core';
import { LocationsService } from 'src/app/providers/locations.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  historyBooking: any;

  constructor(
    public locationsService: LocationsService) {
    this.historyBooking = [];
  }

  ngOnInit(): void {
    var localUserId:any=window.localStorage.getItem('fight-user');
    localUserId = JSON.parse(localUserId);
    if(localUserId?.detail.id){
     this.getApi_mybooking(localUserId?.detail.id)
    }
  }
  getApi_mybooking(id:any) {
    this.locationsService.Api_mybooking(id).subscribe(
      (res: any) => {
        this.historyBooking = res
        console.log(this.historyBooking);
      },
      (err) => {
        console.log(err);
      }
    );

  }

}
