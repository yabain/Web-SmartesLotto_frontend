import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { WebStorage } from 'src/app/services/storage/web.storage';
import { TranslationService } from 'src/app/services/translation/language.service';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css'],
})
export class ForgotPwdComponent implements OnInit {
  submitted = false;
  sended = false;
  waitingResponse = false;
  error = false;
  errorMsg = '';

  textDir: String = 'ltr';
  public Toggledata=true;
  public CustomControler:any
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
    public translationService: TranslationService,
    private router: Router
    ) {
      if (localStorage.getItem('access-token') && localStorage.getItem('user-data')) {
        this.router.navigateByUrl('/index');
      } 
      //this is to determine the text direction depending on the selected language
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
    this.scrollToTop();
    this.waitingResponse = false;
    this.error = false;

    this.storage.Checkuser();
    this.translate.use(this.translationService.getLanguage());
    // console.log('111 Venant du service: ', this.translationService.getLanguage());    
    this.form = this.formLog.group({
        'field_email': ['', Validators.compose([
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])]
    });
  }

  submit() {
    this.scrollToTop();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    this.waitingResponse = true;

    // console.log('user mail: ', this.form.value.field_email);
    this.authService.resetPassword(this.form.value.field_email)
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  iconLogle(){
    this.Toggledata = !this.Toggledata
  }
  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
