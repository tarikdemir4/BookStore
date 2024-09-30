import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RequestModel } from '../models/request.model';
import { FormsModule } from '@angular/forms';
import { CategoryPipe } from '../pipes/category.pipe';
import { BookModel } from '../models/book.model';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, TranslateModule, CommonModule, FormsModule, CategoryPipe,InfiniteScrollModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  books: BookModel[] = [];
  categories: any = [];
  pageNumbers: number[] = [];
  request: RequestModel = new RequestModel();
  searchCategory: string = "";
  newData: any[] = [];

  constructor(private http: HttpClient) {
    this.getCategories();
  }

  feedData() {
    this.request.pageSize += 10;
    this.newData = [];
    this.getAll();
  }

  changeCategory(categoryId: number | null = null) {
    this.request.categoryId = categoryId;
    this.request.pageSize = 0;
    this.feedData();
  }


  getAll() {
    this.http
      .post<BookModel[]>(`https://localhost:7280/api/Books/GetAll`, this.request)
      .subscribe(res => {
        this.books = res;
      })
  }


  getCategories() {
    this.http.get("https://localhost:7280/api/Categories/GetAll")
      .subscribe(res =>{
        this.categories = res
        this.getAll();
      } );
  }


}
