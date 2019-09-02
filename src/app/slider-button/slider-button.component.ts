import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	ViewChild
} from '@angular/core';

interface PanEvent {
	deltaX: number;
	velocityX: number;
	distance: number;
	isFirst: boolean;
	isFinal: boolean;
}

const ANIMATION_DURATION = 300;

@Component({
	selector: 'app-slider-button',
	templateUrl: './slider-button.component.html',
	styleUrls: ['./slider-button.component.scss'],
})
export class SliderButtonComponent {
	@ViewChild('button', {static: true}) button: ElementRef;
	@ViewChild('container', {static: true}) container: ElementRef;

	@Input() label: string;
	@Input() magnetThreshold = .9;
	@Output() valueChange = new EventEmitter<number>();

	private animationTimer: number;

	onPan(event: PanEvent) {
		const container = this.container.nativeElement as Element;
		const padding = parseInt(getComputedStyle(container).paddingLeft, 10);
		const containerWidth = container.getBoundingClientRect().width;
		const buttonWidth = this.button.nativeElement.getBoundingClientRect().width;
		const max = containerWidth - buttonWidth - 2 * padding;

		requestAnimationFrame(() => {
			let x = event.deltaX < max ? event.deltaX : max;
			x = event.deltaX < 0 ? 0 : x;

			if (event.isFinal) {
				if (x / max > this.magnetThreshold) {
					x = max;
				} else {
					x = 0;
				}
				clearTimeout(this.animationTimer);
				this.button.nativeElement.classList.add('is-animating');
				this.animationTimer = setTimeout( () => {
					this.button.nativeElement.classList.remove('is-animating');
					this.valueChange.emit(x / max);
				}, ANIMATION_DURATION);
			} else {
				this.valueChange.emit(x / max);
			}

			this.button.nativeElement.style.transform = `translate3d(${x}px,0,0)`;
		});
	}

	reset(): void {
		this.valueChange.emit(0);
		this.button.nativeElement.style.transform = `translate3d(0,0,0)`;
		clearTimeout(this.animationTimer);
		this.button.nativeElement.classList.add('is-animating');
		this.animationTimer = setTimeout( () => {
			this.button.nativeElement.classList.remove('is-animating');
		}, ANIMATION_DURATION);
	}
}
