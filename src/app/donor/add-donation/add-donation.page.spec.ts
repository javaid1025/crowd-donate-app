import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDonationPage } from './add-donation.page';

describe('AddDonationPage', () => {
  let component: AddDonationPage;
  let fixture: ComponentFixture<AddDonationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDonationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDonationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
