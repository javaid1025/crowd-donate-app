import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DonorChatPage } from './donor-chat.page';

describe('DonorChatPage', () => {
  let component: DonorChatPage;
  let fixture: ComponentFixture<DonorChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorChatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DonorChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
