import { Injectable } from '@angular/core';
import {Donations} from '../models/donations';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  donations: Donations[] = [];

  constructor() {
  }

  setDonations(donations: Donations[]) {
    this.donations = donations;
    localStorage.setItem('donations', JSON.stringify(this.donations));
  }

  getDonations() {
    return this.donations;
  }
}
