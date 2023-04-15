import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lotto',
  templateUrl: './lotto.component.html',
  styleUrls: ['./lotto.component.css']
})
export class LottoComponent implements OnInit {
  numbers = [];
  selectedNumbers = [];
  bonusNumbers = [];
  selectedBonusNumber = null;

  ngOnInit(): void {
    for (let i = 1; i <= 50; i++) {
      this.numbers.push(i);
    }
    for (let i = 1; i <= 20; i++) {
      this.bonusNumbers.push(i);
    }
  }

  draw() {
    this.selectedBonusNumber = null;
    this.selectedNumbers = [];

    while (this.selectedNumbers.length < 5) {
      let index = Math.floor(Math.random() * this.numbers.length);
      let number = this.numbers[index];
      if (!this.selectedNumbers.includes(number)) {
        this.selectedNumbers.push(number);
      }
    }
    let bonusIndex = Math.floor(Math.random() * this.bonusNumbers.length);
    this.selectedBonusNumber = this.bonusNumbers[bonusIndex];
  }

  toggleSelection(number) {
    let index = this.selectedNumbers.indexOf(number);
    if (index === -1 && this.selectedNumbers.length < 5) {
      this.selectedNumbers.push(number);
    } else {
      this.selectedNumbers.splice(index, 1);
    }
  }

  toggleBonusNumberSelection(number) {
    if (this.selectedBonusNumber === number) {
      this.selectedBonusNumber = null;
    } else {
      this.selectedBonusNumber = number;
    }
  }

  isSelected(number) {
    return this.selectedNumbers.includes(number);
  }

  isSpecialSelected(number) {
    return this.selectedBonusNumber === number;
  }

  clearAll() {
    // this.numbers.forEach((number) => {
    //   number.selected = false;
    // });
    // this.bonusNumbers.forEach((number) => {
    //   number.selected = false;
    // });
    this.selectedNumbers = [];
    this.selectedBonusNumber = null;
  }
  
}
