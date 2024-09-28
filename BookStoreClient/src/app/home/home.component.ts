import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RequestModel } from '../models/request.model';
import { FormsModule } from '@angular/forms';
import { CategoryPipe } from '../pipes/category.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, TranslateModule, CommonModule, FormsModule,CategoryPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  response: any;
  categories: any = [];
  pageNumbers: number[] = [];
  request: RequestModel = new RequestModel();
  searchCategory: string = "";

  constructor(private http: HttpClient) {
    this.getAll();
    this.getCategories();
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
  getCategories() {
    this.http.get("https://localhost:7280/api/Categories/GetAll")
      .subscribe(res => this.categories = res);
  }
  changeCategory(categoryId: number | null = null) {
    this.request.categoryId = categoryId;
    this.getAll(1);
  }

  setPageNumber() {
    this.pageNumbers = [];
    for (let i = 0; i < this.response.totalPageCount; i++) {
      this.pageNumbers.push(i + 1);

    }
  }

}
