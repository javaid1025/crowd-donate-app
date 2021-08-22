import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import * as firebase from 'firebase';
import {LoadingController, NavController} from '@ionic/angular';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {ProjectService} from '../../services/project.service';
import {Donations} from '../../models/donations';

@Component({
    selector: 'app-add-donation',
    templateUrl: './add-donation.page.html',
    styleUrls: ['./add-donation.page.scss'],
})
export class AddDonationPage implements OnInit {

    types: string[] = ['Clothes', 'Food', 'Money', 'Shoe', 'Grocery', 'Others'];
    donationForm: FormGroup;
    units: string [] = ['Grams', 'Kilo grams', 'Dozen', 'Pieces', 'Others'];
    picture: any;
    loading: any;
    user: User;
    uid: string;
    donation: Donations;
    length: number;
    index: number;

    constructor(private formBuilder: FormBuilder,
                private loadingCtrl: LoadingController,
                private navCtrl: NavController,
                private userService: UserService,
                private service: ProjectService,
                private camera: Camera) {
    }

    ngOnInit() {
        this.user = this.userService.getUser();
        this.formInitializer();
        if (this.user.isNGO) {
            this.donationForm.controls.picture.setValue('image');
        }
        setTimeout( () => {
            this.uid = this.service.getUid();
            this.length = this.service.getLength();
        }, 500);
    }

    formInitializer() {
        this.donationForm = this.formBuilder.group({
            name: [null, [Validators.required]],
            quantity: ['', [Validators.required]],
            quantityUnit: ['', [Validators.required]],
            type: ['', [Validators.required]],
            picture: [this.picture, [Validators.required]]
        });
    }

    async donate() {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        const data = this.donationForm.value;
        this.loading.present();
        const name: string = Date.now().toString() + '.jpg';
        firebase.storage().ref(`/donationImages/${name}`)
            .putString(data.picture, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
            firebase.storage().ref(`/donationImages/` + snapshot.metadata.name)
                .getDownloadURL().then(urL => {
                if (this.loading) {
                    this.loading.dismiss();
                }
                this.addDonationToRealTime(Date.now().toString(), data, urL);
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

    async addDonationToRealTime(uid, data, url) {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        console.log('data', data);
        const ref = 'donations-' + this.user.uid;
        firebase.database().ref(`/${ref}/${uid}`).set({
            itemName: data.name,
            image: url,
            quantity: data.quantity,
            quantityUnit: data.quantityUnit,
            time: uid,
            show: false,
            type: data.type
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

    async updateDonationList() {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        const data = this.donationForm.value;
        console.log('data', data);
        firebase.database().ref(`/projects/${this.uid}/donationsRequired/`).child(this.length.toString()).set({
            itemName: data.name,
            quantity: data.quantity,
            quantityUnit: data.quantityUnit,
            type: data.type,
            time: Date.now().toString(),
            image: ''
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
            this.picture = base64Image;
            this.donationForm.patchValue({
                picture: this.picture,
            });
        }, (err) => {
            alert(err);
        });
    }
}
