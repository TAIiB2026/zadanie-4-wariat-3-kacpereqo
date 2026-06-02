import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private readonly http = inject(HttpClient);
  private readonly URL = 'http://localhost:5114/api/Timer';

  get(): Observable<number> {
    return this.http.get<number>(this.URL);
  }
}