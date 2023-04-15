import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WebStorage } from 'src/app/services/storage/web.storage';
import { TranslationService } from 'src/app/services/translation/language.service';

@Component({
  selector: 'app-link-recieve',
  templateUrl: './link-recieve.component.html',
  styleUrls: ['./link-recieve.component.css'],
})
export class LinkRecieveComponent implements OnInit {
  token = '';

  textDir: String = 'ltr';
  public Toggledata = true;
  public CustomControler: any
  public subscription: Subscription;
  form: FormGroup;

  get f() {
    return this.form.controls;
  }

  constructor(
    private storage: WebStorage,
    private translate: TranslateService,
    public translationService: TranslationService,
    private toastr: ToastrService,
    private router: Router) {
    console.log('url: ', this.router.url)

    const urlData = this.router.url.split('token=');
    if (urlData[1]) {
      this.token = urlData[1];
      localStorage.setItem('token_datas', this.token);
      console.log ('token in locale storage: ', this.token)
      this.router.navigateByUrl('/mail/mail-confirm');
    } else {
      const urlDataPwd = this.router.url.split('resetTokenPwd=');
      if (urlDataPwd[1]) {
        this.token = urlDataPwd[1];
        localStorage.setItem('pwd_token_datas', this.token);
        console.log('resetttttttt: ', this.token)
        this.router.navigateByUrl('/auth/new-pwd');
      } else {
        console.log('no token');
        this.router.navigateByUrl('/aut/login');
        this.toastr.error('Link error!', 'Error', { timeOut: 4000})
      }
    }

    //this is to determine the text direction depending on the selected language
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.textDir = event.lang == 'fr' ? 'rtl' : 'ltr';
    });

    this.subscription = this.storage.Loginvalue.subscribe((data) => {
      if (data != 0) {
        this.CustomControler = data;
      }
    });
  }

  ngOnInit() {
    this.storage.Checkuser();
    this.translate.use(this.translationService.getLanguage());

  }

  submit() {
  }
}
