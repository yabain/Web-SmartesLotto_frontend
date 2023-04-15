import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { WebStorage } from 'src/app/services/storage/web.storage';
import { TranslationService } from 'src/app/services/translation/language.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  waitingResponse = false;
  submitted = false;
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
    private router: Router
    ) {
      if (localStorage.getItem('access-token') && localStorage.getItem('user-data')) {
        this.router.navigateByUrl('/index');
      } 
      
      this.lang = this.translationService.initLanguage();
      
      if (this.lang == 'en'){
        this.en = true;
        this.fr = false;
      } else if (this.lang == 'fr'){
        this.en = false;
        this.fr = true;
      } else {
        this.lang = 'fr';
        this.en = false;
        this.fr = true;
      }

      translate.onLangChange.subscribe((event: LangChangeEvent) =>
      {
        this.textDir = event.lang == 'fr'? 'rtl' : 'ltr';
      });

    this.subscription = this.storage.Loginvalue.subscribe((data) => {
      if(data != 0){
        this.CustomControler = data;
      }
    });
  }

  ngOnInit() {
    this.translate.use(this.translationService.getLanguage());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  setEnLang(){
    this.translationService.setLanguage('en');
  }

  setFrLang(){
    this.translationService.setLanguage('fr');
  }
}
