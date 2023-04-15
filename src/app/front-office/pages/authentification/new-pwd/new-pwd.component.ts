import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { WebStorage } from 'src/app/services/storage/web.storage';
import { TranslationService } from 'src/app/services/translation/language.service';

@Component({
  selector: 'app-new-pwd',
  templateUrl: './new-pwd.component.html',
  styleUrls: ['./new-pwd.component.css'],
})
export class NewPwdComponent implements OnInit {
  submitted = false;
  waitingResponse = false;
  error = false;
  errorMsg = '';
  storageToken = ''

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
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService,
    public translationService: TranslationService
  ) {
    if(localStorage.getItem('pwd_token_datas')){
      this.storageToken = localStorage.getItem('pwd_token_datas')
      localStorage.removeItem('pwd_token_datas');
    } else {
      this.router.navigate(['auth/login']);
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
    this.waitingResponse = false;
    this.error = false;

    this.storage.Checkuser();
    this.translate.use(this.translationService.getLanguage());
    // console.log('111 Venant du service: ', this.translationService.getLanguage());    
    this.form = this.formLog.group({
      'field_password': ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)])
      ],
      'confirm_password': ['', Validators.required]
    },
    {validator: this.checkIfMatchingPasswords('field_password', 'confirm_password')});
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
      else {  
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  submit() {

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    this.waitingResponse = true;

    console.log('user datas: ', this.form.value.field_password);
    this.authService.reNewPassword(this.form.value.field_password, this.storageToken)
      .then((result) => {
        this.submitted = false;
        this.waitingResponse = false;
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
  iconLogle() {
    this.Toggledata = !this.Toggledata
  }
}
