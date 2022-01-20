import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NiceSelectModule } from 'ng-nice-select';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';
import { BannerComponent } from './banner/banner.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RecomHotelsComponent } from './recom-hotels/recom-hotels.component';
import { CategoryComponent } from './category/category.component';
import { RecomFlightsComponent } from './recom-flights/recom-flights.component';
import { RecomCruiseComponent } from './recom-cruise/recom-cruise.component';
import { ServicesComponent } from './services/services.component';
import { RecomCarsComponent } from './recom-cars/recom-cars.component';
import { TeamComponent } from './team/team.component';
import { WhyUsComponent } from './why-us/why-us.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { BlogsComponent } from './blogs/blogs.component';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { AutocompleteModule } from 'ng2-input-autocomplete';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    SearchFormComponent,
    AboutUsComponent,
    RecomHotelsComponent,
    CategoryComponent,
    RecomFlightsComponent,
    RecomCruiseComponent,
    ServicesComponent,
    RecomCarsComponent,
    TeamComponent,
    WhyUsComponent,
    TestimonialsComponent,
    BlogsComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    HomeRoutingModule,
    SharedModule,
    NgbModule,
    HttpClientModule,
    SlickCarouselModule,
    NiceSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatInputModule,
    AngularMultiSelectModule,
    //  MatAutocompleteModule,
    AutocompleteLibModule, HttpClientJsonpModule, HttpClientModule,
    AutocompleteModule.forRoot()],
  providers: [DatePipe],
})
export class HomeModule { }
