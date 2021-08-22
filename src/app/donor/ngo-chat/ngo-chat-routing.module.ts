import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NgoChatPage } from './ngo-chat.page';

const routes: Routes = [
  {
    path: '',
    component: NgoChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgoChatPageRoutingModule {}
