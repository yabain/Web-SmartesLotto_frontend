import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { TranslationService } from 'src/app/services/translation/language.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {

  textDir: String = 'ltr';
  
  constructor(
    public translate: TranslateService,
    public translationService: TranslationService,
    private router: Router
    ) {
      this.scrollToTop();
      if (localStorage.getItem('access-token') && localStorage.getItem('user-data')) {
        this.router.navigateByUrl('/index');
      } 
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
  ngOnInit() {
    this.scrollToTop();
    this.translate.use(this.translationService.getLanguage());
  }

}
