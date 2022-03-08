import { Component } from '@angular/core';
import { HelperService } from '../../helper/helper.service';
import { AuthService } from 'src/app/providers/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends HelperService {
  localUserIds: any;
  localUsertype: any;
 constructor(
  public authService: AuthService,
  private route:Router){
   super();

   var localUserId: any = window.sessionStorage.getItem('fight-user');
   localUserId = JSON.parse(localUserId);
   this.localUserIds = localUserId?.detail.id;
   this.localUsertype=localUserId?.detail.type;
   console.log(" this.localUsertype", this.localUsertype)
 }

  onLogout() {  
   this.authService.signout();
  }
myAgencyBoking(){
  this.route.navigate(['/flight-grid-left/my-list'])
}

goToRandomNumberPage(event:any) {
  event.preventDefault();
  this.route.navigateByUrl('/', {skipLocationChange: true})
    .then(() => this.route.navigate(['/flight-grid-left/view-ticket/null']));
}
  
}
