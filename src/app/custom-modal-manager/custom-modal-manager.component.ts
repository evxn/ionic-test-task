import {Component, Input, OnInit} from '@angular/core';
import { LIFECYCLE_DID_ENTER, LIFECYCLE_WILL_ENTER, LIFECYCLE_WILL_LEAVE, LIFECYCLE_DID_LEAVE } from '@ionic/core';
import {CustomModalRef} from '../services/custom-modal-ref';

const ANIMATION_DURATION = 300;

@Component({
	selector: 'app-custom-modal-manager',
	templateUrl: './custom-modal-manager.component.html',
	styleUrls: ['./custom-modal-manager.component.scss'],
})
export class CustomModalManagerComponent implements OnInit {
	@Input()
	customModalRef: CustomModalRef<any>;
	isShown: boolean;

	async ngOnInit() {
		this.customModalRef.result.finally(() => {
			safelyCall(this.customModalRef.componentInstance[LIFECYCLE_DID_LEAVE]);
		});

		safelyCall(this.customModalRef.componentInstance[LIFECYCLE_WILL_ENTER]);

		this.isShown = true;

		await delay(ANIMATION_DURATION);
		safelyCall(this.customModalRef.componentInstance[LIFECYCLE_DID_ENTER]);
	}

	onBackdropClicked() {
		this.customModalRef.cancel('backdrop');
	}

	onDismiss(): Promise<void> {
		safelyCall(this.customModalRef.componentInstance[LIFECYCLE_WILL_LEAVE]);
		this.isShown = false;

		return delay(ANIMATION_DURATION);
	}
}

// helpers

function safelyCall(fn?: () => void) {
	if (fn instanceof Function) {
		fn();
	}
}

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}
