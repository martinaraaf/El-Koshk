import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LatestVideos } from '../interface/latestVideos.model';

@Injectable({
  providedIn: 'root',
})
export class LatestVideosService {
  constructor(private http: HttpClient) {}
  getLatest(): Observable<LatestVideos> {
    return this.http.get<LatestVideos>(`http://localhost:8000/video/getLatest`);
  }
}
