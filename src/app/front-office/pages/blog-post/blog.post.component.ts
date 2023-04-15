import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
    ) {
      if (localStorage.getItem('access-token') && localStorage.getItem('user-data')) {
        this.router.navigateByUrl('/index');
      } 
  }

  ngOnInit() {
    this.scrollToTop();
    this.translate.use(this.translationService.getLanguage());
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
