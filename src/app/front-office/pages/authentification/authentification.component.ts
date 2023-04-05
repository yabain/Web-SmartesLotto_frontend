import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  // styleUrls: ['./authentification.component.css'],
})
export class AuthentificationComponent implements OnInit {
  textDir: String = 'ltr';
  
  constructor(
    ) {
  }

  ngOnInit() {
  }
}
