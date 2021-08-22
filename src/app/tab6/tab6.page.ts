import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import * as firebase from 'firebase';
import {Project} from '../models/donations';
import {AlertController, LoadingController, NavController} from '@ionic/angular';

@Component({
    selector: 'app-tab6',
    templateUrl: './tab6.page.html',
    styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {
    users: any = [];
    loading: any;
    constructor(private  loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private navCtrl: NavController) {
        this.loadData();
    }

    ngOnInit() {
    }

    async loadData() {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        firebase.database().ref('/users')
            .on('value', snapshot => {
                this.users = [];
                snapshot.forEach((node) => {
                    this.users.push(node.val());
                    console.log(this.users);
                });
                // this.service.setProjects(this.projects);
                console.log('projects', this.users);
                if (this.loading) {
                    this.loading.dismiss();
                }
            }, err => {
                console.log('error: ', err);
                // this.users = this.service.getProjects();
            });
    }

    expandCLick(item: Project) {
        item.show = !item.show;
    }

    openChat(email) {
        localStorage.setItem('selectedEmail', email);
        this.navCtrl.navigateForward(['/admin-chat']);
    }

    async editUser(user) {
        const [alert] = await Promise.all([this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Please enter correct information of user!',
            inputs: [
                {
                    name: `name`,
                    type: 'text',
                    value: user.fullName ? user.fullName : '',
                    placeholder: 'Enter name (2 words)'
                },
                {
                    name: `email`,
                    type: 'email',
                    value: user.email ? user.email : '',
                    placeholder: 'Enter Email'
                },
                {
                    name: `phone`,
                    type: 'number',
                    value: user.phone ? user.phone : '',
                    placeholder: 'Enter Phone'
                },
                {
                    name: `username`,
                    type: 'text',
                    value: user.username ? user.username : '',
                    placeholder: 'Enter Username'
                },
                {
                    name: `address`,
                    type: 'text',
                    value: user.address ? user.address : '',
                    placeholder: 'Enter Address'
                },
                {
                    name: `city`,
                    type: 'text',
                    value: user.city ? user.city : '',
                    placeholder: 'Enter City'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Ok',
                    handler: (alertData) => {
                        const fullName = alertData.name.split(' ');
                        console.log(alertData.name);
                        this.updateUserInFirebase(fullName, alertData, user.uid);
                    }
                }
            ]
        })]);
        await alert.present();
    }

    async updateUserInFirebase(fullName, alertData, uid) {
        this.loading = await this.loadingCtrl.create({
            message: 'Please wait...'
        });
        this.loading.present();
        firebase.database().ref(`users/${uid}`).update({
            fullName: fullName,
            email: alertData.email,
            phone: alertData.phone,
            username: alertData.username,
            address: alertData.address,
            city: alertData.city,
        }).then(res => {
            this.loading.dismiss();
            alert('User removed successfully from database but not from authentication.' +
                ' Please connect with supper admin to delete user from authentication');
            console.log(res);
        }).catch(err => {
            this.loading.dismiss();
            console.log('err: ', err);
        });
    }

    async deleteUser(uid) {
        this.loading = await this.loadingCtrl.create({
            message: 'Please wait...'
        });
        this.loading.present();
        firebase.database().ref(`/users/${uid}`).remove().then(res => {
            console.log(res);
            this.loading.dismiss();
        }).catch(err => {
            this.loading.dismiss();
            console.log('err: ', err);
        });
    }

    addUser() {
        this.navCtrl.navigateForward(['/signup']);
    }
}
