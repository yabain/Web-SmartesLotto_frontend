import { Component, OnInit } from '@angular/core';
import {
  Event,
  NavigationStart,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation/language.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
})
export class SidemenuComponent implements OnInit {
  waitingResponse = false;
  submitted = false;
  name: any
  splitVal;
  base;
  page;
  url;
  constructor(
    private router: Router,
    location: Location,
    public commonService: CommonServiceService,
    private authService: AuthService,
    private translate: TranslateService,
    private translationService: TranslationService
  ) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (event instanceof NavigationStart) {
          this.splitVal = event.url.split('/');
          this.base = this.splitVal[1];
          this.page = this.splitVal[2];
        }
      }
    });
    this.url = location.path();
    if (this.url) {
      this.splitVal = this.url.split('/');
      this.base = this.splitVal[1];
      this.page = this.splitVal[2];
    }
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
  ngOnInit() {
    this.scrollToTop();
    this.translate.use(this.translationService.getLanguage());
  }

  logout() {
    this.submitted = true;
    this.waitingResponse = true;
    setTimeout(() => {
      this.authService.logOut();
      this.submitted = false;
      this.waitingResponse = false;
      this.commonService.nextmessage('logout');
    }, 3000)
  }

  navigate(name: any) {
    this.name = name;
    this.commonService.nextmessage(name);
  }

  Logout() {
    this.authService.logOut();

  }
}
