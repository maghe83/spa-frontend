import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KistlerRecord } from '../model/kistler/KistlerRecord';

@Injectable({
  providedIn: 'root',
})
export class KistlerService {
  private url: string = 'http://localhost:8080/kistler/records';

  constructor(private http: HttpClient) {}

  public getKistlerDataSource(): Observable<KistlerRecord[]> {
    return this.http.get<KistlerRecord[]>(this.url);
  }
}
