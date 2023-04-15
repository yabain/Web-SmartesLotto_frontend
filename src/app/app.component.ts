import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './services/translation/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'smartestlotto';
  windowScrolled = false;

  constructor(
		public translate: TranslateService,
		public translationService: TranslationService
  ){
		this.translationService.initLanguage();
    translate.setDefaultLang('fr');
    // translate.use('fr');
  }

  ngOnInit() {
    window.addEventListener('scroll', () => {
      this.windowScrolled = window.pageYOffset !== 0;
    });
  }
  
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
