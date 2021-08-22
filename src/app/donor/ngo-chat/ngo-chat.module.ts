import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NgoChatPageRoutingModule } from './ngo-chat-routing.module';

import { NgoChatPage } from './ngo-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgoChatPageRoutingModule
  ],
  declarations: [NgoChatPage]
})
export class NgoChatPageModule {}
