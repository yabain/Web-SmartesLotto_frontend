import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation/language.service';

@Component({
  selector: 'app-lotto-list',
  templateUrl: './lotto-list.component.html',
  styleUrls: ['./lotto-list.component.css'],
})
export class LottoListComponent implements OnInit {

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

  navigateToUrl(lotto: string){
    this.router.navigate(['/lotteries/' + lotto]);
    // this.router.navigateByUrl('/lotteries/' + lotto);
    console.log('/lotteries/' + lotto);
  }
}
