import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountsByCuiResponse, Transactions, AccountResponse } from '../../interfaces/account';
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl: string = `${environment.API_URL}/client`;

  constructor(private http: HttpClient) {}

  getAccountByNumber(accountNumber: string): Observable<AccountResponse> {
    const url = `${this.baseUrl}/account/by-number`;
    return this.http.get<AccountResponse>(url, {
      params: new HttpParams().set('account_number', accountNumber),
    });
  }

  getAccountsByCui(cui: string): Observable<AccountsByCuiResponse> {
    const url = `${this.baseUrl}/accounts/by-cui`;
    return this.http.get<AccountsByCuiResponse>(url, {
      params: new HttpParams().set('cui', cui),
    });
  }
} 

