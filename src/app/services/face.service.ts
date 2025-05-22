import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaceService {

  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  captureFace(imageBase64: string, username: string): Observable<any> {
    const body = {
      image: imageBase64,
      username: username
    };
    return this.http.post(this.apiUrl, body);
  }
}
