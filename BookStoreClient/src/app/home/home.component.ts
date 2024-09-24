import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RequestModel } from '../models/request.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, TranslateModule, CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  response: any;
  pageNumbers: number[] = [];
  request: RequestModel = new RequestModel();

  constructor(private http: HttpClient) {
    this.getAll();
  }
  getAll(pageNumber = 1) {
    this.request.pageNumber = pageNumber;
    this.http
      .post(`https://localhost:7280/api/Books/GetAll`, this.request)
      .subscribe(res => {
        this.response = res;
        this.setPageNumber();
      })
  }

  setPageNumber() {
    this.pageNumbers = [];
    for (let i = 0; i < this.response.totalPageCount; i++) {
      this.pageNumbers.push(i + 1);

    }
  }

}
