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
    return this.http.post("http://localhost:3001/login", user);
  }

  test(): Observable<any> {
    return this.http.get("http://localhost:3001/");
  }

  saveUserStorage(user: any) {
    this.credentialsService.setCredentials(user);
  }
}