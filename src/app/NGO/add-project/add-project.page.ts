import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Donations} from '../../models/donations';
import {AlertController, LoadingController, NavController} from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
    selector: 'app-add-project',
    templateUrl: './add-project.page.html',
    styleUrls: ['./add-project.page.scss'],
})
export class AddProjectPage implements OnInit {

    projectForm: FormGroup;
    donations: Donations[] = [];
    minDate: any;
    maxDate: any;
    donationForm: FormGroup;
    types: string[] = ['Clothes', 'Food', 'Money', 'Shoe', 'Grocery', 'Others'];
    units: string [] = ['Grams', 'Kilo grams', 'Dozen', 'pairs', 'Pieces', 'Others'];
    loading: any;

    constructor(private formBuilder: FormBuilder,
                private loadingCtrl: LoadingController,
                private navCtrl: NavController,
                private alertCtrl: AlertController) {
        this.loadDate();
    }

    loadDate() {
        this.minDate = new Date().toISOString();
        this.maxDate = new Date(new Date().setFullYear(new Date().getFullYear() + 10)).toISOString();
        console.log('date:', this.minDate);
        console.log('max date: ', this.maxDate);
    }

    ngOnInit() {
        this.formInitializer();
        this.donationFormInitializer();
    }

    formInitializer() {
        this.projectForm = this.formBuilder.group({
            name: [null, [Validators.required]],
            dependents: ['', [Validators.required]],
            startDate: ['', Validators.required],
            endDate: ['', Validators.required]
        });
    }

    donationFormInitializer() {
        this.donationForm = this.formBuilder.group({
            itemName: [null, [Validators.required]],
            quantity: [null, [Validators.required]],
            quantityUnit: [null, Validators.required],
            type: [null, Validators.required]
        });
    }

    async addDonation() {
      if (this.donations.length === 0) {
        alert('Please enter At least One Required Item for donation.');
      } else {
        this.loading = await this.loadingCtrl.create({
          message: 'please wait...'
        });
        this.loading.present();
        const data = this.projectForm.value;
        const id = Date.now().toString();
        // const id = Date().toString();
        console.log('data', data);
        firebase.database().ref(`/projects/${id}`).set({
          uid: id,
          name: data.name,
          dependents: data.dependents,
          startDate: data.startDate,
          endDate: data.endDate,
          donationsRequired: this.donations,
          show: false,
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
    }

    addDonationToList() {
        console.log('form data:', this.projectForm.value);
        const data = this.donationForm.value;
        this.donations.push({
            show: false,
            itemName: data.itemName,
            quantity: data.quantity,
            quantityUnit: data.quantityUnit,
            time: new Date().toString(),
            type: data.type,
            image: ''
        });
    }

    expandDonation(donation: Donations) {
        donation.show = !donation.show;
    }
}
