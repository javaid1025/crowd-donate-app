import {Component} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {User} from './models/user';
import {UserService} from './services/user.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    appState: any;
    user: User;

    // public appPages = [
    //   {
    //     title: 'Address',
    //     url: '/address',
    //     icon: 'mail'
    //   },
    //   {
    //     title: 'Forget password',
    //     url: '/forgot-password',
    //     icon: 'paper-plane'
    //   },
    //   {
    //     title: 'Login',
    //     url: '/login',
    //     icon: 'heart'
    //   },
    //   {
    //     title: 'Profile Picture',
    //     url: '/profile-picture',
    //     icon: 'archive'
    //   },
    //   {
    //     title: 'Trash',
    //     url: '/folder/Trash',
    //     icon: 'trash'
    //   },
    //   {
    //     title: 'Spam',
    //     url: '/folder/Spam',
    //     icon: 'warning'
    //   }
    // ];
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private service: UserService,
        private navCtrl: NavController
    ) {
        this.initializeApp();
        this.user = service.getUser();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.statusBar.backgroundColorByHexString('#dadada'); // success
            // this.statusBar.backgroundColorByHexString('#3dc2ff');  // secondary
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.checkAppState();
        });
    }

    checkAppState() {
        if (this.user) {
            if (this.user.isAdmin) {
                this.navCtrl.navigateRoot(['tabs/tab5']);
            } else {
                this.navCtrl.navigateRoot(['/tabs/tab1']);
            }
        } else {
            this.navCtrl.navigateRoot(['/']);
        }
    }
}
