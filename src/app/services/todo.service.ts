import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url: string = 'assets/data/items.json';

  constructor(private http: HttpClient) { }

  public getTodoItems(): Observable<any> {
    return this.http.get(this.url);
  }
}
