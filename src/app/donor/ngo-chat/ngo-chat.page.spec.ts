import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NgoChatPage } from './ngo-chat.page';

describe('NgoChatPage', () => {
  let component: NgoChatPage;
  let fixture: ComponentFixture<NgoChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgoChatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NgoChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
