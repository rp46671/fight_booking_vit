import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { FlightsGridLeftComponent } from './flights-grid-left.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';

const routes: Routes = [
  {
    path: '',
    component: FlightsGridLeftComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'content-fight' },
      { path: 'content-fight', component: ContentComponent },
      { path: 'view-fight', component: ViewDetailsComponent },
      { path: 'view-ticket/:pnr', component: ViewTicketComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightsGridLeftRoutingModule { }
