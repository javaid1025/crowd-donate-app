import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDonationPage } from './add-donation.page';

const routes: Routes = [
  {
    path: '',
    component: AddDonationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDonationPageRoutingModule {}
