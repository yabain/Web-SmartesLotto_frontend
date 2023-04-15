import { Component, OnInit, TemplateRef } from '@angular/core';
import * as $ from 'jquery';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  constructor(
    public commonService: CommonServiceService
  ) {}

  ngOnInit(): void {
  }
}
