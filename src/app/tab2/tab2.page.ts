import {Component} from '@angular/core';
import {LoadingController, NavController} from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    donors = [];
    loading: any;
    close: boolean;
    open: boolean;

    constructor(private loadingCtrl: LoadingController,
                private navCtrl: NavController) {
        this.loadData();
    }

    expandCLick(item) {
        item.show = !item.show;
    }

    async loadData() {
        this.open = false;
        this.close = true;
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        firebase.database().ref('/donors')
            .once('value').then(snapshot => {
            snapshot.forEach((node) => {
                this.donors.push(node.val());
                if (this.loading) {
                    this.loading.dismiss();
                }
                console.log(this.donors);
            });
        }).catch(err => {
            if (this.loading) {
                this.loading.dismiss();
            }
            alert(err);
        });
    }

    openChat() {
        this.navCtrl.navigateForward(['/chat']);
    }
}
