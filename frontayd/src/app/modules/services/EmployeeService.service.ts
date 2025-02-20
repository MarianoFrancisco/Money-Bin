import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeRequest, UpdateEmployeeResponse } from '../../interfaces/Employee';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly getRequestsUrl = `${environment.API_URL}/cancellation/getRequestChangeInfo`;
  private readonly updateInfoUrl = `${environment.API_URL}/account/changeInfo`;

  constructor(private http: HttpClient) {}

  // Fetch employee change requests
  getRequests(): Observable<{ Solicitudes: EmployeeRequest[] }> {
    return this.http.get<{ Solicitudes: EmployeeRequest[] }>(this.getRequestsUrl);
  }

  // Update employee information
  updateEmployeeInfo(data: FormData): Observable<UpdateEmployeeResponse> {
    const headers = new HttpHeaders().set('Accept', 'application/json');
    return this.http.post<UpdateEmployeeResponse>(this.updateInfoUrl, data, { headers });
  }
}
