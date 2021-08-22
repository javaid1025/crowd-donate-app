import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./authentication/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./authentication/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'forget-password',
    loadChildren: () => import('./authentication/forget-password/forget-password.module').then( m => m.ForgetPasswordPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./authentication/change-password/change-password.module').then( m => m.ChangePasswordPageModule)
  },
  {
    path: 'add-donation',
    loadChildren: () => import('./donor/add-donation/add-donation.module').then(m => m.AddDonationPageModule)
  },
  {
    path: 'admin-chat',
    loadChildren: () => import('./admin/admin-chat/admin-chat.module').then( m => m.AdminChatPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'add-project',
    loadChildren: () => import('./NGO/add-project/add-project.module').then( m => m.AddProjectPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./NGO/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'tab6',
    loadChildren: () => import('./tab6/tab6.module').then( m => m.Tab6PageModule)
  },
  {
    path: 'donor-chat',
    loadChildren: () => import('./donor/donor-chat/donor-chat.module').then( m => m.DonorChatPageModule)
  },
  {
    path: 'channels',
    loadChildren: () => import('./admin/channels/channels.module').then( m => m.ChannelsPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./shared/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./shared/privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./shared/contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./shared/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./shared/terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./shared/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'channels',
    loadChildren: () => import('./NGO/channels/channels.module').then( m => m.ChannelsPageModule)
  },
  {
    path: 'donor-chat',
    loadChildren: () => import('./NGO/donor-chat/donor-chat.module').then( m => m.DonorChatPageModule)
  },
  {
    path: 'channels',
    loadChildren: () => import('./donor/channels/channels.module').then( m => m.ChannelsPageModule)
  },
  {
    path: 'ngo-chat',
    loadChildren: () => import('./donor/ngo-chat/ngo-chat.module').then( m => m.NgoChatPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
