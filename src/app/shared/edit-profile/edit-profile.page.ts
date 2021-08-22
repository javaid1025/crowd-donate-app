import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';
import {AlertController, LoadingController, NavController} from '@ionic/angular';
import {Project} from '../../models/donations';
import {createConsoleLogServer} from '@ionic/angular-toolkit/builders/cordova-serve/log-server';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.page.html',
    styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
    user: any;
    loading: any;
    show = false;
    cities: any;
    city: any;
    base64Image: any;

    constructor(private service: UserService,
                private camera: Camera,
                private loadingCtrl: LoadingController,
                private navCtrl: NavController,
                private alertCtrl: AlertController) {
        this.user = this.service.getUser();
        this.city = this.user.city;
        this.cities = service.cities;
    }

    ngOnInit() {
    }

    async getPicture() {
        const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            message: 'Select Profile Picture !',
            buttons: [
                {
                    text: 'Camera',
                    cssClass: 'secondary',
                    handler: () => {
                        this.openCamera(1);
                    }
                }, {
                    text: 'Gallery',
                    handler: () => {
                        this.openCamera(2);
                    }
                }
            ]
        });
        await alert.present();
    }

    openCamera(type) {
        const options: CameraOptions = {
            quality: 40,
            sourceType: type,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then((imageData) => {
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
            this.user.profileImage = this.base64Image;
        }, (err) => {
            alert(err);
        });
    }

    async uploadImageInFireStorage(image) {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        const name: string = Date.now().toString() + '.jpg';
        firebase.storage().ref(`/profileImages/${name}`)
            .putString(image, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
            firebase.storage().ref(`/profileImages/` + snapshot.metadata.name)
                .getDownloadURL().then(urL => {
                this.user.profileImage = urL;
                this.updateUserInFirebase();
                this.loading.dismiss();
            }).catch(err => alert(err));
        }).catch(err => alert(err));
    }

    async getName() {
        const [alert] = await Promise.all([this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Edit Your Name!',
            inputs: [
                {
                    name: `name`,
                    type: 'text',
                    value: this.user.fullName ? this.user.fullName : '',
                    placeholder: 'Enter full name'
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
                        this.user.fullName = alertData.name;
                    }
                }
            ]
        })]);
        await alert.present();
    }

    async getPhone() {
        const [alert] = await Promise.all([this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Edit Your Phone!',
            inputs: [
                {
                    name: `phone`,
                    type: 'text',
                    value: this.user.phone ? this.user.phone : '',
                    placeholder: 'Phone number...'
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
                        this.user.phone = alertData.phone;
                        console.log(alertData.phone);
                    }
                }
            ]
        })]);
        await alert.present();
    }

    async getAddress() {
        const [alert] = await Promise.all([this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Edit Your Address!',
            inputs: [
                {
                    name: `address`,
                    type: 'text',
                    value: this.user.address ? this.user.address : '',
                    placeholder: 'Enter CNIC...'
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
                        this.user.address = alertData.address;
                        console.log(alertData.address);
                    }
                }
            ]
        })]);
        await alert.present();
    }

    expandCities() {
        this.show = !this.show;
    }

    async getCity() {
        const cities = this.service.cities;
    }

    setCity(event: CustomEvent) {
        this.user.city = this.city;
        console.log(event);
        console.log(this.city);
    }

    updateUser() {
        if (this.base64Image) {
            this.uploadImageInFireStorage(this.base64Image);
        } else {
          this.updateUserInFirebase();
        }
    }

    async updateUserInFirebase() {
      this.loading = await this.loadingCtrl.create({
        message: 'please wait...'
      });
      this.loading.present();
      firebase.database().ref(`/users/${this.user.uid}`).set(this.user)
          .then(res => {
            console.log(res); this.loading.dismiss();
            this.navCtrl.back();
          })
          .catch(err => {
            console.log(err); this.loading.dismiss();
          });
    }
}
