import { Component } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import {Platform} from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  ngoRole = true;
  user: User;
  constructor(private service: UserService,
              private platform: Platform,
              private localNotifications: LocalNotifications) {
    setTimeout(() => {
      const time = new Date().getTime() + 3600;
      console.log('', time);
      // this.showNotifications();
      // this.showNotifications1();
      // this.showNotifications2();
      this.user = service.getUser();
    }, 1000);
  }

  showNotifications() {
    this.localNotifications.schedule({
      title: 'Delayed ILocalNotification',
      text: 'detailed message goes here.',
    });
  }

  showNotifications1() {
    const isAndroid = this.platform.is('android');
    this.localNotifications.schedule([{
      id: 1,
      text: 'Multi ILocalNotification 1',
      sound: isAndroid ? 'file://sound.mp3' : 'file://beep.caf',
      data: { secret: 'data display here.' }
    },
      {
      id: 2,
      title: 'Local ILocalNotification Example',
      text: 'Multi ILocalNotification 2',
      icon: 'http://example.com/icon.png'
    }]);
  }

  showNotifications2() {
    const isAndroid = this.platform.is('android');
    this.localNotifications.schedule({
      id: 1,
      text: 'Single ILocalNotification',
      sound: isAndroid ? 'file://sound.mp3' : 'file://beep.caf',
      data: { secret: 'data goes here.' }
    });
  }
}
