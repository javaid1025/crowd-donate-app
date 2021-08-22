import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { Camera } from '@ionic-native/camera/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import * as firebase from 'firebase';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

const firebaseConfig = {
    apiKey: "AIzaSyAU6UuDjGfewMSoukN0gznwpU3sgkItsIQ",
    authDomain: "crowd-donate-app.firebaseapp.com",
    databaseURL: "https://crowd-donate-app-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "crowd-donate-app",
    storageBucket: "crowd-donate-app.appspot.com",
    messagingSenderId: "916870107229",
    appId: "1:916870107229:web:4b69f25bebc8bc80183db4",
    measurementId: "G-CQ7DHRC82J"
  };
firebase.initializeApp(firebaseConfig);

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        IonicModule.forRoot(),
        AppRoutingModule],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
        Facebook,
        GooglePlus,
        FirebaseX,
        LocalNotifications,
        EmailComposer,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
