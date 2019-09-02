import {
	ComponentFactoryResolver,
	Injectable,
	Type,
	Injector,
	ViewContainerRef,
} from '@angular/core';
import {CustomModalManagerComponent} from '../custom-modal-manager/custom-modal-manager.component';
import {CustomModalRef} from './custom-modal-ref';

@Injectable()
export class CustomModalService {
	constructor(
		private cfr: ComponentFactoryResolver,
	) { }

	create<T>(viewContainerRef: ViewContainerRef, type: Type<T>): CustomModalRef<T> {
		const componentFactory = this.cfr.resolveComponentFactory<T>(type);
		const activeModal = new ActiveCustomModal();
		const modalInjector = Injector.create({
			providers: [{ provide: ActiveCustomModal, useValue: activeModal }],
			parent: viewContainerRef.injector
		});
		const componentRef = componentFactory.create(modalInjector);

		const managerComponentFactory = this.cfr.resolveComponentFactory(CustomModalManagerComponent);
		const managerComponentRef = viewContainerRef.createComponent(
			managerComponentFactory,
			undefined,
			undefined,
			[[componentRef.location.nativeElement]]
		);

		const customModalRef =  new CustomModalRef(componentRef.instance, managerComponentRef);

		managerComponentRef.instance.customModalRef = customModalRef;

		activeModal.dismiss = customModalRef.dismiss.bind(customModalRef);
		activeModal.cancel = customModalRef.cancel.bind(customModalRef);

		componentRef.hostView.detectChanges();

		return customModalRef;
	}
}

@Injectable()
export class ActiveCustomModal {
	public dismiss: (result?: any) => void;
	public cancel: (reason?: any) => void;
}
