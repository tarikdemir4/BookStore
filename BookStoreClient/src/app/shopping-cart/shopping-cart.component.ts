import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [TranslateModule,CommonModule,FormsModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

  language: string = "en";

  constructor(
    public shopping: ShoppingCartService,
    private translate: TranslateService
  ) {
    if (localStorage.getItem("language")) {
      this.language = localStorage.getItem("language") as string;
    }
    this.shopping.calcTotal();
  }
}
