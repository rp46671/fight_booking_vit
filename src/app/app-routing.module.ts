import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './providers/guard/auth.guard';

const routes: Routes = [
  // Homepage
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule), data: { breadcrumb: "login" } },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
  { path: '', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule), data: { breadcrumb: "Homepage" } },
  { path: 'about', loadChildren: () => import('./components/pages/about/about.module').then(m => m.AboutModule), data: { breadcrumb: "About Us" } },
  { path: 'flight-grid-left', loadChildren: () => import('./components/pages/flights-grid-left/flights-grid-left.module').then(m => m.FlightsGridLeftModule), data: { breadcrumb: "Flights Grid" } },
  { path: 'flight-details/:id', loadChildren: () => import('./components/pages/flights-details/flights-details.module').then(m => m.FlightsDetailsModule), data: { breadcrumb: "Flights Details" } },
  { path: 'contact', loadChildren: () => import('./components/pages/contact/contact.module').then(m => m.ContactModule), data: { breadcrumb: "Contact Us" } },
  { path: 'faqs', loadChildren: () => import('./components/pages/faqs/faqs.module').then(m => m.FaqsModule), data: { breadcrumb: "FAQ's" } },
  { path: 'booking', loadChildren: () => import('./components/pages/booking/booking.module').then(m => m.BookingModule), data: { breadcrumb: "Booking" } },
  { path: 'view-ticket', loadChildren: () => import('./components/pages/ticket-view/ticket-view.module').then(m => m.TicketViewModule), data: { breadcrumb: "Ticket" } },
  { path: 'booking-payment', loadChildren: () => import('./components/pages/booking-payment/booking-payment.module').then(m => m.BookingPaymentModule), data: { breadcrumb: " Booking Payment" } },
  { path: 'gallery', loadChildren: () => import('./components/pages/gallery/gallery.module').then(m => m.GalleryModule), data: { breadcrumb: "Gallery" } },
  { path: 'error-page', loadChildren: () => import('./components/pages/error-page/error-page.module').then(m => m.ErrorPageModule), data: { breadcrumb: "Error 404" } },
  { path: 'coming-soon', loadChildren: () => import('./components/pages/coming-soon/coming-soon.module').then(m => m.ComingSoonModule), data: { breadcrumb: "Coming Soon" } },
  { path: '**', loadChildren: () => import('./components/pages/error-page/error-page.module').then(m => m.ErrorPageModule), data: { breadcrumb: "Error 404" } }
]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
