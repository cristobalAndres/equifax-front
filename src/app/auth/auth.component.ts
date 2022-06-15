import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
  }

  login() {
    const user = {email: '12123', password: '123'};
    this.authService.login(user).subscribe( data => {
      console.log(data);
      this.authService.saveUserStorage(data);
      this.router.navigate([this.route.snapshot.queryParams.redirect || '/tickets'], { replaceUrl: true });
    });
  }

}
