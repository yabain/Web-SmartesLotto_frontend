import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation/language.service';

@Component({
  selector: 'app-lotteries',
  templateUrl: './lotteries.component.html',
  styleUrls: ['./lotteries.component.css'],
})
export class LotteriesComponent implements OnInit {
  textDir: String = 'ltr';
  
  constructor(
    public translate: TranslateService,
    public translationService: TranslationService,
    private router: Router
    ) {
      if (localStorage.getItem('access-token') && localStorage.getItem('user-data')) {
        this.router.navigateByUrl('/index');
      } 
  }

  ngOnInit() {
    this.scrollToTop();
    this.translate.use(this.translationService.getLanguage());
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
