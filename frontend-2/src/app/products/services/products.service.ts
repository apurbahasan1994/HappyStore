import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl = environment.baseUrl;
  public isLoggedIn = false;
  constructor(private _http: HttpClient) { }
  getAllProducts() {
    return this._http.get(`${this.baseUrl}products`);
  }
}
