import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import {CustomModalService} from '../services/custom-modal.service';
import {SliderButtonComponent} from '../slider-button/slider-button.component';

@NgModule({
  imports: [
	CommonModule,
	FormsModule,
	IonicModule,
	RouterModule.forChild([
		{
		path: '',
		component: HomePage
		}
	])
  ],
  declarations: [HomePage, ConfirmModalComponent, SliderButtonComponent],
  entryComponents: [ConfirmModalComponent],
  providers: [CustomModalService]
})
export class HomePageModule {}
