import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation/language.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog.post.component.html',
  styleUrls: ['./blog.post.component.css'],
})
export class BlogPostComponent implements OnInit {
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
