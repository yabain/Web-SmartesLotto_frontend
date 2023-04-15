import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocationService } from 'src/app/services/location/location.service';
import { WebStorage } from 'src/app/services/storage/web.storage';
import { TranslationService } from 'src/app/services/translation/language.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  waitingResponse = false;
  submitted = false;
  error = false;
  errorMsg = '';
  mailSended = false;
  lang: string;
  form: FormGroup;
  textDir: String = 'ltr';
  country: any = [];
  city: any = [];

  public Toggledata = true;
  public subscription!: Subscription;
  public CustomControler: any;

  public isvalidconfirmpassword: boolean = false;


  constructor(
    private toastr: ToastrService,
    private storage: WebStorage,
    private formLog: FormBuilder,
    private authService: AuthService,
    private translate: TranslateService,
    public translationService: TranslationService,
    private location: LocationService,
    private router: Router
  ) {
    if (localStorage.getItem('access-token') && localStorage.getItem('user-data')) {
      this.router.navigateByUrl('/index');
    }

    this.lang = this.translationService.initLanguage();
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.textDir = event.lang == 'fr' ? 'rtl' : 'ltr';
    });

    this.subscription = this.storage.Createaccountvalue.subscribe((data) => {
      this.CustomControler = data;
    });
  }

  ngOnInit() {
    this.scrollToTop();
    this.translate.use(this.translationService.getLanguage());
    this.country = this.location.country();
    this.mailSended = false;
    this.storage.Checkuser();
    this.form = this.formLog.group({
      'field_firstName': ['', Validators.compose([
        Validators.required,
        Validators.minLength(4)])],
      'field_lastName': ['', Validators.compose([
        Validators.required,
        Validators.minLength(4)])],
      'field_password': ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)])
      ],
      'field_email': ['', Validators.compose([
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      'field_profilPicture': ['assets/img/smartestlotto-use-profile.png'],
      'field_country': ['', Validators.required],
      'field_location': ['', Validators.required],
      'field_agree': ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
  
  submit() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    this.waitingResponse = true;

    if (this.form.value.field_country == '1') {
      this.form.value.field_country = 'Cameroon'
    } else if (this.form.value.field_country == '2') {
      this.form.value.field_country = 'Congo'
    } else if (this.form.value.field_country == '3') {
      this.form.value.field_country = 'Gabon'
    } else if (this.form.value.field_country == '4') {
      this.form.value.field_country == 'EqGuinee'
    }

    console.log("User Datas from reg: ", this.form.value)

    this.authService.createAccount(this.form.value)
      .then((result) => {
        this.submitted = false;
        this.waitingResponse = false;
        this.mailSended = true;
        this.toastr.success("Your account has been created. You will receive a confirmation email.", 'Success');
      })
      .catch((error) => {
        console.error('Erreur: ', error.message);
        this.waitingResponse = false;
        this.errorMsg = error.message;
        this.error = true;
        this.submitted = false;

      });
  }

  onSelect(country) {
    this.city = this.location.city()
      .filter(e =>
        e.id == country.target.value);
  }

  iconLogle() {
    this.Toggledata = !this.Toggledata
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
