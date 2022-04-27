import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})

export class MainComponent {
isEnLang:boolean=false
constructor(private translocoService:TranslocoService){}

switchLang(){
  if(this.isEnLang){
    this.translocoService.setActiveLang('en')
    this.isEnLang=false
  }else{
    this.translocoService.setActiveLang('ru')
    this.isEnLang=true
  }

}
}
