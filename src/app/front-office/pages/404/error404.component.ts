import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { WebStorage } from 'src/app/services/storage/web.storage';
import { TranslationService } from 'src/app/services/translation/language.service';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css'],
})
export class error404Component implements OnInit {
  error = false;
  errorMsg = '';
  lang: string;
  en: boolean = false;
  fr: boolean = false;

  textDir: String = 'ltr';
  public subscription!: Subscription;
  public CustomControler:any

  constructor(
    private translate: TranslateService,
    public translationService: TranslationService,
    private storage: WebStorage,
    ) {
      this.lang = this.translationService.initLanguage();

  }

  ngOnInit() {
    this.translate.use(this.translationService.getLanguage());
  }
}
