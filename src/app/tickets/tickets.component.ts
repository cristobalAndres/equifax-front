import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  testClick() {
    this.authService.test().subscribe(
      data => {
        console.log('HOLA MUNDO ->', )
      },
      err => {
        console.log('ERRR -->>>', err)
      }
    )
  }
}
