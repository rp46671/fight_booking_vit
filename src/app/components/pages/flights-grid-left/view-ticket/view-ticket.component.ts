import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationsService } from 'src/app/providers/locations.service';

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.css']
})
export class ViewTicketComponent implements OnInit {
  statusData: any = null;
  showingValue?: boolean;
  constructor(
    private _locationsService: LocationsService, private activateRoute:ActivatedRoute
  ) {
    this.showingValue = false;
    this.statusData = null;
  }
  ngOnInit(): void {
    this.showingValue = false;
    this.activateRoute.params.subscribe(parms=>{
      console.log(parms)
      if(parms.pnr!=null && parms.pnr!='null'){
        this.getTicket(parms)
      }
    })
  }

  getTicket(refrenceNumber: any) {
    this.showingValue = true;
    if (refrenceNumber.value) {
      this._locationsService.ama_print(String(refrenceNumber.value)).subscribe((res) => {

        this.statusData = res;

        console.log("this.showingValue", this.showingValue);
      });
    }
  }
}
