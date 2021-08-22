import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {Donations, Project} from '../models/donations';
import {AlertController, LoadingController, NavController} from '@ionic/angular';
import {element} from 'protractor';
import {ProjectService} from '../services/project.service';
import {User} from '../models/user';
import {UserService} from '../services/user.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    projects: Project[] = [];
    loading: any;
    user: User;

    constructor(private loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private service: ProjectService,
                private userService: UserService,
                private navCtrl: NavController) {
        this.loadData();
        this.user = userService.getUser();
        // this.insertDummyData();
    }

    ngOnInit() {
    }

    addProject() {
        this.navCtrl.navigateForward(['/add-project']);
    }

    addDonation(i) {
        const length = this.projects[i].donationsRequired.length;
        this.service.setLength(length);
        const uid = this.projects[i].uid;
        console.log('uid: ', uid);
        console.log('length: ', length);
        this.service.setUid(uid);
        this.navCtrl.navigateForward(['/add-donation']);
    }

    async loadData() {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        firebase.database().ref('/projects')
            .on('value', snapshot => {
                this.projects = [];
                snapshot.forEach((node) => {
                    this.projects.push(node.val());
                    console.log(this.projects);
                });
                this.service.setProjects(this.projects);
                console.log('projects before', this.projects[0].donationsRequired);
                this.projects.forEach((project) => {
                    project.show = false;
                    project.donationsRequired.forEach(donation => {
                        donation.show = false;
                    });
                });
                console.log('projects', this.projects);
                if (this.loading) {
                    this.loading.dismiss();
                }
            }, err => {
                console.log('error: ', err);
                this.projects = this.service.getProjects();
            });
    }

    expandCLick(item: Project) {
        item.show = !item.show;
    }

    expandDonation(donation: Donations) {
        donation.show = !donation.show;
    }

    insertDummyData() {
        const id = '823c6r7767x763r6gc2b76gb76r2b376';
        const id1 = '903c6r7767x763r6gc2b76gb76r2b390';
        firebase.database().ref(`/projects/${id1}`).set({
            uid: id1,
            name: 'Aftari Programm',
            dependents: '150',
            startDate: '1603201603468',
            endDate: '2003201603468',
            donationsRequired: [
                {
                    itemName: 'coca cola drink',
                    quantity: '150',
                    quantityUnit: 'pet',
                    time: '1603201603468',
                    type: 'fod',
                },
                {
                    itemName: 'carpet',
                    quantity: '5',
                    quantityUnit: 'piece',
                    time: '1603201603468',
                    type: 'stuff',
                },
            ]
        });
        firebase.database().ref(`/projects/${id}`).set({
            uid: id,
            name: 'child laborer',
            dependents: '50',
            startDate: '1603201603468',
            endDate: '1603201603468',
            donationsRequired: [
                {
                    itemName: 'Casual dress',
                    quantity: '1500',
                    quantityUnit: 'piece',
                    time: '1603201603468',
                    type: 'clothes',
                },
                {
                    itemName: 'formal dress',
                    quantity: '500',
                    quantityUnit: 'piece',
                    time: '1603201603468',
                    type: 'clothes',
                },
            ]
        }).then(res => {
            if (this.loading) {
                this.loading.dismiss();
            }
            this.navCtrl.back();
        }).catch(err => {
            if (this.loading) {
                this.loading.dismiss();
            }
            alert(err);
        });

    }

    async editQuantity(i: number, j: number) {
        const quantity = this.projects[i].donationsRequired[j].quantity;
        const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            message: 'Please Update Quantity !',
            inputs: [{
                name: 'quantity',
                type: 'number',
                value: quantity ? quantity + '' : '',
                placeholder: 'Enter Quantity',
            }],
            buttons: [
                {
                    text: 'Cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: 'OK',
                    handler: (data) => {
                        console.log('data :', data.quantity);
                        this.updateQuantityInFirebase(data.quantity, i, j);
                    }
                }
            ]
        });
        await alert.present();
    }

    async updateQuantityInFirebase(quantity, i, j) {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        const uid = this.projects[i].uid;
        this.projects[i].donationsRequired[j].quantity = quantity;
        const donationsRequired: Donations[] = this.projects[i].donationsRequired;
        firebase.database().ref(`/projects/${uid}`).update({
            donationsRequired
        }).then(() => {
            if (this.loading) {
                this.loading.dismiss();
            }
        }).catch((error) => {
            if (this.loading) {
                this.loading.dismiss();
            }
            alert(error);
        });
    }

    sendDonation() {
        this.navCtrl.navigateForward(['/add-donation']);
    }

    openChat() {
        this.navCtrl.navigateForward(['/chat']);
    }
}
