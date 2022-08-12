import { Directive, HostListener } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[click-stop-propagation]',
})
export class ClickStopPropagationDirective {
  @HostListener('click', ['$event'])
  onClick(event: any): void {
    event.stopPropagation();
  }
}
