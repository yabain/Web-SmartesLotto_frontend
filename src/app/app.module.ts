import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { TranslationService } from './services/translation/language.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './front-office/shared/footer/footer.component';
import { NavigationComponent } from './front-office/shared/navigation/navigation.component';
import { AuthentificationModule } from './front-office/pages/authentification/authentification.module';
// import { PagesModule } from './front-office/pages/pages.module';
import { LoginComponent } from './front-office/pages/authentification/login/login.component';
import { RegisterComponent } from './front-office/pages/authentification/register/register.component';
import { error404Component } from './front-office/pages/404/error404.component';
import { AboutComponent } from './front-office/pages/about/about.component';
import { BlogDetailsComponent } from './front-office/pages/blog-details/blog.details.component';
import { BlogPostComponent } from './front-office/pages/blog-post/blog.post.component';
import { ContactComponent } from './front-office/pages/contact/contact.component';
import { FaqComponent } from './front-office/pages/faq/faq.component';
import { LotteriesComponent } from './front-office/pages/lotteries/lotteries.component';
import { WelcomeComponent } from './front-office/pages/welcome/welcome.component';
import { CommentsComponent } from './front-office/sections/comments/comments.component';
import { FontactFormComponent } from './front-office/sections/contact-form/contact.form.component';
import { RecomArticlesComponent } from './front-office/sections/recom-articles/recom.articles.component';
import { SubscriptionComponent } from './front-office/sections/subscription/subscription.component';
import { promotionsComponent } from './front-office/sections/promotions/promotions.component';
import { ConnexionComponent } from './front-office/sections/connexion/connexion.component';
import { ProgressIndeterminateModule } from './front-office/shared/progress-indeterminate/progress-indeterminate.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SignupComponent } from './front-office/pages/authentification/signup/signup.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    // Authentification pages
    LoginComponent,
    RegisterComponent,
    AppComponent,

    // Front pages
    WelcomeComponent,
    AboutComponent,
    LotteriesComponent,
    BlogDetailsComponent,
    BlogPostComponent,
    ContactComponent,
    FaqComponent,
    error404Component,
    RecomArticlesComponent,
    SubscriptionComponent,
    FontactFormComponent,
    SignupComponent,

    // shared sections
    FooterComponent,
    NavigationComponent,

    // Sections
    promotionsComponent,
    CommentsComponent,
    ConnexionComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthentificationModule,
    ProgressIndeterminateModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [
    TranslationService],
  bootstrap: [AppComponent],
  exports: [
    FooterComponent,
    NavigationComponent
  ]
})
export class AppModule { }
