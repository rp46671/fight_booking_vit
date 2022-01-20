import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NiceSelectModule } from 'ng-nice-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FlightsGridLeftRoutingModule } from './flights-grid-left-routing.module';
import { FlightsGridLeftComponent } from './flights-grid-left.component';
import { SharedModule } from '../../shared/shared.module';
import { ContentComponent } from './content/content.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';

@NgModule({
  declarations: [
    FlightsGridLeftComponent,
    ContentComponent,
    ViewDetailsComponent,
    ViewTicketComponent
  ],
  imports: [
    CommonModule,
    FlightsGridLeftRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NiceSelectModule,
    NgxPaginationModule,
    SlickCarouselModule,
    AngularMultiSelectModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse', loadingText: 'This item is actually loading...' }),
  ], providers: [
    DatePipe
  ]
})
export class FlightsGridLeftModule { }
