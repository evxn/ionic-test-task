import {
	Component,
	ViewContainerRef,
} from '@angular/core';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import {CustomModalService} from '../services/custom-modal.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {

	constructor(
		private viewContainerRef: ViewContainerRef,
		private customModal: CustomModalService,
	) {}

	async showModal() {
		const modalRef = this.customModal.create(this.viewContainerRef, ConfirmModalComponent);
		modalRef.result.then(res => console.log(res)).catch(err => console.log(err));
	}
}
