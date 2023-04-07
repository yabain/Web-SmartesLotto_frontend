import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { WebStorage } from 'src/app/services/storage/web.storage';
import { TranslationService } from 'src/app/services/translation/language.service';

@Component({
  selector: 'app-mail-link',
  templateUrl: './mail-link.component.html',
  styleUrls: ['./mail-link.component.css'],
})
export class MailLinkComponent implements OnInit {
  token = '';

  submitted = true;
  waitingResponse = true;
  error = false;
  msg = '';
  lang: string;
  sended = false;
  errorMsg = '';

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
    private formLog: FormBuilder,
    private authService: AuthService,
    private translate: TranslateService,
    private router: Router,
    public translationService: TranslationService
  ) {

    //this is to determine the text direction depending on the selected language
    this.lang = this.translationService.initLanguage();
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
    this.form = this.formLog.group({
      'field_email': ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])]
    });

    this.token = localStorage.getItem('token_datas');
    console.log('token verify email: ', this.token);
    // this.token = ',njsdjkkfshkdfkjsdkjf';

    if (this.token) {
      this.waitingResponse = true;
      this.error = false;

      setTimeout(() => {

        this.authService.verifyEmail(this.token)
          .then((result) => {
            this.submitted = false;
            this.waitingResponse = false;
            localStorage.removeItem('token_datas');
          })
          .catch((error) => {
            this.error = true;
            console.error('Erreur: ', error.message);
            this.submitted = false;
            this.waitingResponse = false;
            this.msg = error.message;
            console.log("error msg: ", this.msg);
            localStorage.removeItem('token_datas');

          });
      }, 3000);

    } else {
      this.router.navigate(['/auth/login']);
    }

  }

  submit() {

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    this.waitingResponse = true;

    // console.log('user mail: ', this.form.value.field_email);
    this.authService.reSendMailLink(this.form.value.field_email)
      .then((result) => {
        this.submitted = false;
        this.waitingResponse = false;
        this.sended = true;
      })
      .catch((error) => {
        console.error('Erreur: ', error.message);
        this.waitingResponse = false;
        this.errorMsg = error.message;
        this.error = true;
        this.submitted = false;

      });
  }
}
