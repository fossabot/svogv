import { Component } from '@angular/core';

@Component({
  
  templateUrl: './common.component.html'
})
export class CommonComponent {

  constructor() {
  }

  testButton(){
    alert('Yes!');
  }

}
