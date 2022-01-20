import { Component } from '@angular/core';
import { HelperService } from '../../helper/helper.service';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends HelperService {
 constructor(
  public authService: AuthService){
   super();
 }
  onLogout() {  
   this.authService.signout();
  }
}
