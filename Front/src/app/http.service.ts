import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class apiService {

  constructor(private http: HttpClient) { }
  getColumns() {
    return this.http.get(`${environment.api_url}/columns`)
  }
  getData(body: any) {
    return this.http.post(`${environment.api_url}/columns`, body);
  }
}
