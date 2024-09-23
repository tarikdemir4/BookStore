import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslateModule,RouterModule
  ],
  template:"<router-outlet></router-outlet>"
})
export class AppComponent implements OnInit {
  languages=['tr','en'];
  private translateService=inject(TranslateService)

  ngOnInit(): void {
    const defaultLange=localStorage.getItem('language')||'tr';
    this.translateService.setDefaultLang(defaultLange);
    this.translateService.use(defaultLange);
  }

  changeLanguage(lang:string){
    this.translateService.use(lang);
    localStorage.setItem('language',lang);
  }
  
}
