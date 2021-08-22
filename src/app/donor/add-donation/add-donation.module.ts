import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDonationPageRoutingModule } from './add-donation-routing.module';

import { AddDonationPage } from './add-donation.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddDonationPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [AddDonationPage]
})
export class AddDonationPageModule {}
