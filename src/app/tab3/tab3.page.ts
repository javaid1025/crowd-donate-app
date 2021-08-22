import {Component} from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {ActionSheetController, AlertController, LoadingController, NavController} from '@ionic/angular';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

    user: User;
    loading: any;

    constructor(private service: UserService,
                private camera: Camera,
                private loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private actionCtrl: ActionSheetController,
                private navCtrl: NavController) {
        this.user = new User();
        this.user = service.getUser();
    }

    img: any;

    async logOut() {
        const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            message: 'Are you sure to logout?',
            buttons: [
                {
                    text: 'Cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: 'Ok',
                    handler: () => {
                        this.logOutFromFirebase();
                    }
                }
            ]
        });
        await alert.present();
    }

    async logOutFromFirebase() {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        firebase.auth().signOut().then((res) => {
            console.log(res);
            localStorage.clear();
            if (this.loading) {
                this.loading.dismiss();
            }
            this.navCtrl.navigateRoot(['']);
        }).catch((error) => {
            alert(error);
            if (this.loading) {
                this.loading.dismiss();
            }
        });
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
            const base64Image = 'data:image/jpeg;base64,' + imageData;
            this.user.profileImage = base64Image;
            this.service.setUser(this.user);
            // this.updateProfileImageFirebase(base64Image);
            this.uploadImageInFireStorage(base64Image);
            setTimeout(() => {
                this.user = this.service.getUser();
            }, 300);
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
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.updateImageUrlInFirebase(urL);
            }).catch(err => {
                if (this.loading) {
                    this.loading.dismiss();
                }
                alert(err);
            });
            if (this.loading) {
                this.loading.dismiss();
            }
        }).catch(err => {
            if (this.loading) {
                this.loading.dismiss();
            }
            alert(err);
        });
    }

    async updateProfileImageFirebase(base64Image) {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        firebase.database().ref(`/users/${this.user.uid}`).update({
            profileImage: base64Image
        }).then(() => {
            if (this.loading) {
                this.loading.dismiss();
            }
        }).catch(err => {
            if (this.loading) {
                this.loading.dismiss();
            }
            alert(err);
        });
    }

    async updateImageUrlInFirebase(imageUrl) {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        firebase.database().ref(`/users/${this.user.uid}`).update({
            photoUrl: imageUrl
        }).then(() => {
            if (this.loading) {
                this.loading.dismiss();
            }
            this.user.profileImage = imageUrl;
            this.service.setUser(this.user);
        }).catch((error) => {
            if (this.loading) {
                this.loading.dismiss();
            }
            alert(error);
        });
    }

    async updateName() {
        const [alert] = await Promise.all([this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Edit Your Name!',
            inputs: [
                {
                    name: `name`,
                    type: 'text',
                    value: this.user.fullName,
                    placeholder: 'Enter name (2 words)'
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
                        const fullName = alertData.name;
                        this.updateNameInFirebase(fullName);
                        console.log(alertData.name);
                    }
                }
            ]
        })]);
        await alert.present();
    }

    async updateUsername() {
        const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Edit Your Username!',
            inputs: [
                {
                    name: `username`,
                    type: 'text',
                    value: this.user.username,
                    placeholder: 'Enter Username (1 words)'
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
                        this.updateUserNameInFirebase(alertData.username);
                        console.log(alertData.field);
                        console.log('Confirm Ok');
                    }
                }
            ]
        });
        await alert.present();
    }

    async updateUserNameInFirebase(userName) {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        firebase.database().ref(`/users/${this.user.uid}`).update({
            username: userName
        }).then(() => {
            this.user.username = userName;
            this.service.setUser(this.user);
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

    async updateNameInFirebase(name) {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        firebase.database().ref(`/users/${this.user.uid}`).update({
            fullName: name
        }).then(() => {
            this.user.fullName = name;
            this.service.setUser(this.user);
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

    async moreOptions() {
        const alert = await this.actionCtrl.create({
            cssClass: 'my-custom-class',
            buttons: [
                {
                    text: 'Log Out',
                    icon: 'log-out',
                    cssClass: 'secondary',
                    handler: () => {
                        this.logOut();
                    }
                },
                {
                    text: 'Settings',
                    icon: 'settings',
                    cssClass: 'primary',
                    handler: () => {
                        this.navCtrl.navigateRoot(['/tabs/tab1']);
                    }
                },
                {
                    text: 'Change Password',
                    icon: 'lock-closed',
                    cssClass: 'primary',
                    handler: () => {
                        this.navCtrl.navigateForward(['/change-password']);
                        console.log('Destructive clicked');
                    }
                },
                {
                    text: 'Help Desk',
                    icon: 'mail',
                    cssClass: 'primary',
                    handler: () => {
                        console.log('Archive clicked');
                        if (this.user.isAdmin) {
                            this.navCtrl.navigateForward(['/channels']);
                        } else if (this.user.isDonor) {
                            this.navCtrl.navigateForward(['/donor-chat']);
                        } else {
                            this.navCtrl.navigateForward(['/chat']);
                        }
                    }
                },
                {
                    text: 'Cancel',
                    icon: 'backspace',
                    cssClass: 'primary',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        await alert.present();
    }

    goToPrivacy() {
        this.navCtrl.navigateForward((['/privacy']));
    }

    goToContactUs() {
        this.navCtrl.navigateForward(['/contact-us']);
    }

    goToNotifications() {
        this.navCtrl.navigateForward(['/notifications']);
    }

    goToEditProfile() {
        this.navCtrl.navigateForward(['/edit-profile']);
    }

    goToChangePassword() {
        this.navCtrl.navigateForward(['/change-password']);
    }

    goToTerms() {
        this.navCtrl.navigateForward(['/terms']);
    }
}
