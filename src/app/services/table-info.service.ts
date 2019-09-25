import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableInfoService {

  constructor(private http: HttpClient) { }
  tableUrl = 'https://my-json-server.typicode.com/put4er/testDb/posts';
  getDataTable() {
    return this.http.get(this.tableUrl);
  }
}
