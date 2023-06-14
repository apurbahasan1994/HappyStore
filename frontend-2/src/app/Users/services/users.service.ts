import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  baseUrl = environment.baseUrl;
  public isLoggedIn = false;
  constructor(private _http: HttpClient) { }
  getAllUsers() {
    return this._http.get(`${this.baseUrl}users`);
  }
  getUser(userId:number){
    return this._http.get(`${this.baseUrl}users/${userId}`).pipe(shareReplay());
  }
}
