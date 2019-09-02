import {Component, ElementRef, ViewChild} from '@angular/core';
import {ActiveCustomModal} from '../services/custom-modal.service';
import {SliderButtonComponent} from '../slider-button/slider-button.component';

const SHAKE_ANIMATION_DURATION = 820;

@Component({
	selector: 'app-confirm-modal',
	templateUrl: './confirm-modal.component.html',
	styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
	@ViewChild(SliderButtonComponent, {static: true}) slider: SliderButtonComponent;
	@ViewChild('confirmation', {read: ElementRef, static: true}) confirmation: ElementRef;

	confirmed = false;

	private animationTimer: number;

	constructor(public activeModal: ActiveCustomModal) { }

	onSlide(value: number) {
		if (value === 1) {
			if (this.confirmed) {
				this.activeModal.dismiss('confirmed');
			} else {
				this.slider.reset();
				this.shake();
			}
		}
	}

	shake() {
		clearTimeout(this.animationTimer);
		this.confirmation.nativeElement.classList.remove('shake');
		setTimeout(() => {
			this.confirmation.nativeElement.classList.add('shake');
			this.animationTimer = setTimeout( () => {
				this.confirmation.nativeElement.classList.remove('shake');
			}, SHAKE_ANIMATION_DURATION);
		});
	}
}
