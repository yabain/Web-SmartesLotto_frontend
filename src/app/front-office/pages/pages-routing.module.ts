import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { error404Component } from './404/error404.component';
import { AboutComponent } from './about/about.component';
import { BlogDetailsComponent } from './blog-details/blog.details.component';
import { BlogPostComponent } from './blog-post/blog.post.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { LotteriesComponent } from './lotteries/lotteries.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'lotteries',
    component: LotteriesComponent
  },
  {
    path: 'blog-post',
    component: BlogPostComponent
  },
  {
    path: 'blog-details',
    component: BlogDetailsComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'error404',
    component: error404Component
  },
  {
    path: 'lotteries',
    component: LotteriesComponent
  },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
