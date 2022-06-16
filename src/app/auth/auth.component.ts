import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  show = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    const user = this.form.value;
    this.show = false;
    this.authService.login(user).subscribe( data => {
      this.authService.saveUserStorage(data);
      this.router.navigate([this.route.snapshot.queryParams.redirect || '/tickets'], { replaceUrl: true });
    }, error => {
    this.show = true;
    });
  }
}
