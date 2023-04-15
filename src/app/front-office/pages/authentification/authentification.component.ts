import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  // styleUrls: ['./authentification.component.css'],
})
export class AuthentificationComponent implements OnInit {
  textDir: String = 'ltr';
  
  constructor(
    private router: Router
    ) {
  }

  ngOnInit() {
  }
}
