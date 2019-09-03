import {ComponentRef} from '@angular/core';
import {CustomModalManagerComponent} from '../custom-modal-manager/custom-modal-manager.component';

export class CustomModalRef<T> {
	readonly result: Promise<any> = new Promise<any>((
		resolve: (value?: any) => void,
		reject: (reason?: any) => void
	) => {
		this.resolve = resolve;
		this.reject = reject;
	});

	private resolve: (value?: any) => void;
	private reject: (reason?: any) => void;

	constructor(
		public readonly componentInstance: T,
		private managerRef: ComponentRef<CustomModalManagerComponent>
	) {}

	async dismiss(result?: any) {
		await this.managerRef.instance.onDismiss();
		this.resolve(result);
		this.managerRef.destroy();
	}

	async cancel(reason?: any) {
		await this.managerRef.instance.onDismiss();
		this.reject(reason);
		this.managerRef.destroy();
	}
}
