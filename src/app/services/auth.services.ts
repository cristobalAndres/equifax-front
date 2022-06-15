import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CredentialsService } from "./credentials.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private credentialsService: CredentialsService) {}

  login(user): Observable<any> {
    return this.http.post("https://equifax-back-dot-equifax-crud.uc.r.appspot.com/login", user);
  }

  test(): Observable<any> {
    return this.http.get("https://equifax-back-dot-equifax-crud.uc.r.appspot.com/");
  }

  saveUserStorage(user: any) {
    this.credentialsService.setCredentials(user);
  }
}