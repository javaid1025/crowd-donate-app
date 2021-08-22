import {Component, OnInit} from '@angular/core';
import {Donations} from '../models/donations';
import {LoadingController} from '@ionic/angular';
import * as firebase from 'firebase';
import {DonationService} from '../services/donation.service';
import {User} from '../models/user';
import {UserService} from '../services/user.service';

@Component({
    selector: 'app-tab4',
    templateUrl: './tab4.page.html',
    styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

    donations: Donations[] = [];
    loading: any;
    user: User;
    constructor(private loadingCtrl: LoadingController,
                private service: DonationService,
                private userService: UserService) {
        this.loadData();
        this.user = userService.getUser();
    }

    ngOnInit() {
    }

    async loadData() {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        const ref = 'donations-' + this.user.uid;
        firebase.database().ref(`/${ref}`).on('value', snapshot => {
            this.donations = [];
            snapshot.forEach((node) => {
                this.donations.push(node.val());
                console.log('donations: ', this.donations);
            });
            this.loading.dismiss();
            this.service.setDonations(this.donations);
        }, err => {
            this.loading.dismiss();
            alert('Do not load latest data because: ' + err);
            this.donations = this.service.getDonations();
        });
    }

    expandDonation(donation: Donations) {
        donation.show = !donation.show;
    }
}
