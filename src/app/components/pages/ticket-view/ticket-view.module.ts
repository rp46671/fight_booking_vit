import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketViewComponent } from './ticket-view.component';
import { TicketViewRoutingModule } from './ticket-view-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TicketViewComponent
  ],
  imports: [
    CommonModule, TicketViewRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class TicketViewModule { }
