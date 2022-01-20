import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketViewComponent } from './ticket-view.component';


const routes: Routes = [{ path: '', component: TicketViewComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TicketViewRoutingModule { }
