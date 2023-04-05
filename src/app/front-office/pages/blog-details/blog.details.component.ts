import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation/language.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog.details.component.html',
  styleUrls: ['./blog.details.component.css'],
})
export class BlogDetailsComponent implements OnInit {
  textDir: String = 'ltr';
  
  constructor(
    public translate: TranslateService,
    public translationService: TranslationService,
    ) {
  }

  ngOnInit() {
    this.translate.use(this.translationService.getLanguage());
  }
}
