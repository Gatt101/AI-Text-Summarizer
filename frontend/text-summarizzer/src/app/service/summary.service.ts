import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  apiurl = "http://127.0.0.1:5000/summarize";
  constructor(private http:HttpClient) { }
  summarizeText(text: string): Observable<{ summary: string }> {
    return this.http.post<{ summary: string }>(this.apiurl, { text: text });
  }
}
