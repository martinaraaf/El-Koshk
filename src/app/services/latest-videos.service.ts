import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LatestVideosService {
  constructor(private http: HttpClient) {}
  getLatest(): Observable<any> {
    return this.http.get(`http://localhost:8000/video/getLatest`);
  }
}
