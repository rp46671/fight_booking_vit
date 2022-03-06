
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/providers/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinForm?: FormGroup;
  loginDisable?: boolean
  response: any;
  showingError?: boolean
  currentRouter = this.router.url;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private fb: FormBuilder,) {

  }

  ngOnInit(): void {
    //singhandghotralda@gmail.com
    //loveu.021
    this.showingError = false;
    this.loginDisable = false;
    this.signinForm = this.fb.group({
      email: ['singhandghotralda@gmail.com', Validators.required],
      password: ['loveu.021', Validators.required]
    });

    this.response = {};
  }
  get Username() { return this.signinForm?.get('email'); }
  get Password() { return this.signinForm?.get('password'); }

  onLoggedin() {
    this.loginDisable = true;

    // e.preventDefault();
    let requestData = {
      email: this.Username?.value,
      password: this.Password?.value,
    };
    console.log(requestData);
    this.auth.login(requestData).subscribe(
      (res: any) => {
        this.response = res;
        this.loginDisable = false;
        console.log(this.response);
        if (this.response.error == "Error" && this.response.status == "0") {
          this.signinForm?.reset();
          if (confirm('Please Put correct Data')) {
            this.router.navigate(['/auth/login']);
          }
        }
        else {
          this.auth.createSession(this.response);
          sessionStorage.setItem('isLoggedin', 'true');
          if (sessionStorage.getItem('isLoggedin')) {
            this.router.navigate(['']);
          }
        }
      },
      (err) => {
        this.loginDisable = false;
        console.log(err);
      }
    );
  }

}


