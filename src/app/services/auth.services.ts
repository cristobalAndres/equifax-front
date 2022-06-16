import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { CredentialsService } from "./credentials.service";
const credentialsKey = 'user_equifax';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private _credentials;
  constructor(private http: HttpClient, private credentialsService: CredentialsService) {}

  login(user): Observable<any> {
    return this.http.post("https://equifax-back-dot-equifax-crud.uc.r.appspot.com/login", user);
  }

  async getUsers() {
    const requestOptions = {
      headers: await this._getHeaders()
    };
    return this.http.
    get("https://equifax-back-dot-equifax-crud.uc.r.appspot.com/users", requestOptions).toPromise();;
  }

  saveUserStorage(user: any) {
    this.credentialsService.setCredentials(user);
  }

  private async _getHeaders() {
    const savedCredentials = localStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
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