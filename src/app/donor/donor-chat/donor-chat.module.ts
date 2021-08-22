import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DonorChatPageRoutingModule } from './donor-chat-routing.module';

import { DonorChatPage } from './donor-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DonorChatPageRoutingModule
  ],
  declarations: [DonorChatPage]
})
export class DonorChatPageModule {}
