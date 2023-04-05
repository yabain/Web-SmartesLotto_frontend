import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { WebStorage } from 'src/app/services/storage/web.storage';
import { TranslationService } from 'src/app/services/translation/language.service';

@Component({
  selector: 'app-Welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {

  textDir: String = 'ltr';
  
  constructor(
    private translate: TranslateService,
    public translationService: TranslationService,
    private router: Router,
    ) {
  }

  ngOnInit() {
    this.translate.use(this.translationService.getLanguage());
  }

}
