import { Component } from '@angular/core';

@Component({
  selector: 'app-check-box-printer',
  templateUrl: './check-box-printer.component.html',
  styleUrls: ['./check-box-printer.component.scss']
})
export class CheckBoxPrinterComponent {

  isChecked:boolean=false;


  check()
  {
    this.isChecked = true;
  }

  unCheck()
  {
    this.isChecked = false;
  }

}
