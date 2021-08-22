import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import * as firebase from 'firebase';
import {LoadingController, NavController} from '@ionic/angular';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    constructor(private formBuilder: FormBuilder,
                private navCtrl: NavController,
                private loadingCtrl: LoadingController,
    ) {
    }

    signupForm: FormGroup;
    passwordType = 'password';
    passwordIcon = 'eye-off';
    loading: any;
    roles = [`NGO`, 'Donor'];
    isDonor = false;
    isNGO = false;
    orgName = '';

    ngOnInit() {
        this.formInitializer();
        this.signupForm.controls.orgName.setValue('Organization Name');
    }

    hideShowPassword() {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }

    formInitializer() {
        const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/;
        this.signupForm = this.formBuilder.group({
            fullName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
            email: [null, [Validators.required, Validators.pattern(EMAILPATTERN)]],
            user_name: [null, [Validators.required]],
            role: [null, Validators.required],
            orgName: [null, Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            confirm_password: ['', [
                Validators.required, Validators.minLength(6),
                this.mismatchedPasswords('password')]],
            phone: ['+92', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            address: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
            city: [null, Validators.required]
        });
    }

    async signUpUser() {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        const formData = this.signupForm.value;
        firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password).then(res => {
            this.saveUserInRealTime(res.user.uid, res.user.email);
            const auth = firebase.auth().currentUser;
            auth.sendEmailVerification().then(() => {
                alert('We send you a verification email. Please check your email and verify!');
            });
            console.log(res);
            this.navCtrl.navigateRoot(['']);
            if (this.loading) {
                this.loading.dismiss();
            }
        }).catch(err => {
            if (this.loading) {
                this.loading.dismiss();
            }
            console.log(err);
        });
    }

    async saveUserInRealTime(uId, mail) {
        this.loading = await this.loadingCtrl.create({
            message: 'please wait...'
        });
        this.loading.present();
        const formData = this.signupForm.value;
        this.decideRole(formData.role);
        firebase.database().ref(`/users/${uId}`).set({
            fullName: formData.fullName,
            email: mail,
            username: formData.user_name,
            uid: uId,
            isAdmin: false,
            isDonor: this.isDonor,
            isNGO: this.isNGO,
            phone: '0' + formData.phone,
            address: formData.address,
            city: formData.city,
            orgName: formData.orgName
        });
        if (this.loading) {
            this.loading.dismiss();
        }
    }

    mismatchedPasswords(otherControlName: string) {
        return (control: AbstractControl): { [key: string]: any } => {
            const otherControl: AbstractControl = control.root.get(otherControlName);

            if (otherControl) {
                const subscription: Subscription = otherControl.valueChanges.subscribe(
                    () => {
                        control.updateValueAndValidity();
                        subscription.unsubscribe();
                    }
                );
            }
            return otherControl && control.value !== otherControl.value
                ? {match: true}
                : null;
        };
    }

    decideRole(role) {
        if (role === 'NGO') {
            this.isNGO = true;
            this.isDonor = false;
            this.signupForm.controls.orgName.setValue('');
        } else {
            this.isNGO = false;
            this.isDonor = true;
            this.signupForm.controls.orgName.setValue('name');
        }
    }

    changeOption(role) {
        console.log(role.detail.value);
        this.decideRole(role.detail.value);
    }
}
