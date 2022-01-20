import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NiceSelectModule } from 'ng-nice-select';

import { BookingPaymentRoutingModule } from './booking-payment-routing.module';
import { BookingPaymentComponent } from './booking-payment.component';
import { SharedModule } from '../../shared/shared.module';
import { ContentComponent } from './content/content.component';
import { FlightBookingPaymentComponent } from './flight-booking-payment/flight-booking-payment.component';

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
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NiceSelectModule
  ]
})
export class BookingPaymentModule { }
