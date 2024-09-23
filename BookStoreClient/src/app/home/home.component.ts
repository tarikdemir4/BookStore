import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, TranslateModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  response: any;
  pageNumbers: number[] = [];

  constructor(private http: HttpClient) {
    this.getAll();
  }
  getAll(pageNumber = 1) {
    this.http.get(`https://localhost:7280/${pageNumber}/10`)
      .subscribe(res => {
        this.response = res;
        this.setPageNumber();
      })
  }

  setPageNumber() {
    this.pageNumbers=[];
    for (let i = 0; i < this.response.totalPageCount; i++) {
      this.pageNumbers.push(i + 1);

    }
  }

}
