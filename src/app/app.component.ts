import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {SplashScreen} from '@capacitor/splash-screen';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}

  ngOnInit(){
    // this.router.navigateByUrl('home');
    // this.router.navigateByUrl('auth');
    // this.router.navigateByUrl('resultados');
    this.router.navigateByUrl('splash');


  }

  ionViewDitEnter(){
    SplashScreen.hide();
  }
}
