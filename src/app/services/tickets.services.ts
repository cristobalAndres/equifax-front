import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { CredentialsService } from "./credentials.service";

const credentialsKey = 'user_equifax';

@Injectable({
  providedIn: "root"
})
export class TicketsService {
  private _credentials;
  constructor(private http: HttpClient, private credentialsService: CredentialsService) {}

  async getTickets(params:string = null) {
    const requestOptions = {
      headers: await this._getHeaders()
    };
    return this.http.
    get(`https://equifax-back-dot-equifax-crud.uc.r.appspot.com/tickets${params ? `?status=${params}` : ''}`, requestOptions).toPromise();;
  }

  async saveTickets(ticket) {
    const requestOptions = {
      headers: await this._getHeaders()
    };
    return this.http.
    post('https://equifax-back-dot-equifax-crud.uc.r.appspot.com/tickets/create', ticket, requestOptions).toPromise();;
  }

  async updateTickets(ticket) {
    const requestOptions = {
      headers: await this._getHeaders()
    };
    return this.http.
    post('https://equifax-back-dot-equifax-crud.uc.r.appspot.com/tickets/update', ticket, requestOptions).toPromise();;
  }

  async deleteTickets(id) {
    const requestOptions = {
      headers: await this._getHeaders()
    };
    return this.http.
    delete(`https://equifax-back-dot-equifax-crud.uc.r.appspot.com/tickets/delete/${id}`, requestOptions).toPromise();;
  }

  private async _getHeaders() {
    const savedCredentials = localStorage.getItem(credentialsKey) || sessionStorage.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
    
    let token = null;
    if (this._credentials) {
      token =  this._credentials.token;
    }
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    return headers;
  }
}