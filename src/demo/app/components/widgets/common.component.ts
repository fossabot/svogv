import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  templateUrl: './common.component.html'
})
export class CommonComponent {

  constructor() {
  }

  testButton(){
    alert('Yes!');
  }

}
