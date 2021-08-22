import {Injectable} from '@angular/core';
import {FirebaseX} from '@ionic-native/firebase-x/ngx';
import {LoadingController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class PhoneService {

    constructor(private firebaseX: FirebaseX,
                private loadingCtrl: LoadingController) {
    }

    credentials: any;
    loading: any;

    async sendCode(phoneNumber) {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        const timeOutDuration = 60;
        const fakeVerificationCode = '123456';
        let awaitingSms = false;
        this.firebaseX.verifyPhoneNumber(phoneNumber, timeOutDuration, fakeVerificationCode).then((credential) => {
            if (this.loading) {
                this.loading.dismiss();
            }
            console.log('credential', credential);
            if (credential.instantVerification) {
                if (awaitingSms) {
                    awaitingSms = false;
                }
                this.credentials = credential;
            } else {
                awaitingSms = true;
                this.credentials = credential;
            }
        }).catch(err => {
            if (this.loading) {
                this.loading.dismiss();
            }
            alert(err);
        });
    }
}
