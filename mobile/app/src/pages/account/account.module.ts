import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Account } from './account';

@NgModule({
  declarations: [
    Account,
  ],
  imports: [
    IonicPageModule.forChild(Account),
  ],
  exports: [
    Account
  ]
})
export class AccountModule {}
