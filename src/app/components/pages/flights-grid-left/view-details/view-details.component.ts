import { Component, OnInit } from '@angular/core';
import { FlightHelperService } from 'src/app/components/helper/flight/flight-helper.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent extends FlightHelperService  implements OnInit {
  settingsTesti = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 300,
    arrows: false,
    dots: false,
    cssEase: 'linear',
  };
  ngOnInit(): void {
   
  }
}
