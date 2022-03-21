import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NiceSelectModule } from 'ng-nice-select';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BookingPaymentRoutingModule } from './booking-payment-routing.module';
import { BookingPaymentComponent } from './booking-payment.component';
import { SharedModule } from '../../shared/shared.module';
import { ContentComponent } from './content/content.component';
import { FlightBookingPaymentComponent } from './flight-booking-payment/flight-booking-payment.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    BookingPaymentComponent,
    ContentComponent,
    FlightBookingPaymentComponent
  ],
  imports: [
    CommonModule,
    BookingPaymentRoutingModule,
    SharedModule,
    NgbModule,SlickCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    NiceSelectModule,NgSelectModule
  ]
})
export class BookingPaymentModule { }
