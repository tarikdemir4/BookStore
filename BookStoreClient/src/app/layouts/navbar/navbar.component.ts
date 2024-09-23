import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslateModule, RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // styleUrl değil styleUrls olmalı
})
export class NavbarComponent implements OnInit {
  count:number=1;
  languages = ['tr', 'en'];
  private translateService = inject(TranslateService);

  ngOnInit(): void {
    const defaultLang = localStorage.getItem('language') || 'en'; // localStorage'den dili çekiyoruz
    this.translateService.setDefaultLang(defaultLang); // Default dili belirliyoruz
    this.translateService.use(defaultLang); // Seçilen dili kullanıyoruz
  }

  changeLanguage(event: any) {
    const selectedLanguage = event.target.value; // event.target.value'den seçilen dili alıyoruz
    this.translateService.use(selectedLanguage); // Seçilen dili kullanıyoruz
    localStorage.setItem('language', selectedLanguage); // localStorage'a seçilen dili kaydediyoruz
  }
}
