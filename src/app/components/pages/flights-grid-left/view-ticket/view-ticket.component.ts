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
  refrenceNumber: any;
  loading!: boolean;
  disableButton!: boolean;
  constructor(
    private _locationsService: LocationsService, private activateRoute: ActivatedRoute
  ) {
    this.showingValue = false;
    this.statusData = null;
    this.loading = true;
    this.disableButton = true;

  }
  ngOnInit(): void {
    this.showingValue = false;
    this.loading = false;
    this.activateRoute.params.subscribe(parms => {
      console.log(parms)
      if (parms.pnr == 'null') {

      } else {
        this.getTicket(parms.pnr)
      }
    })
  }

  getTicket(refrenceNumber: any) {
    this.loading = true;
    if (refrenceNumber) {
      this._locationsService.ama_print(String(refrenceNumber)).subscribe((res: any) => {
       
        if (res.airlines.status == "0" && res.airlines.error == "Error") {
          this.showingValue = false;

          confirm("Please Enter right Pnr No");
        } else {
          this.showingValue = true;
          this.statusData = res;
        }
        this.loading = false;
        console.log("this.showingValue", this.showingValue);
      });
    }
    
  }
  myButtonDisable(refrenceNumber: any) {
    if (refrenceNumber.length==6) {
      this.disableButton = false;
    } else {
      this.disableButton = true;
    }
  }
}
