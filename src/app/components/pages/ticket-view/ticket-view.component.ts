import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationsService } from 'src/app/providers/locations.service';

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.css']
})
export class TicketViewComponent implements OnInit {
  statusData:any = null;
  constructor(
    private _locationsService: LocationsService,
    private activateRoute:ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.activateRoute.params.subscribe(parms=>{
      if(parms){
        this.getTicket(parms)
      }
    })
  }

  getTicket(refrenceNumber: any) {
    if (refrenceNumber.value) {
      this._locationsService.ama_print(String(refrenceNumber.value)).subscribe((res) => {
        this.statusData = res;
      });
    }
  }
}
