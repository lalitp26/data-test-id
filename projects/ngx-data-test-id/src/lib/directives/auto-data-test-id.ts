import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';
import { DataTestidGeneration } from '../strategies/data-test-id-generation';

@Directive({
  selector: `
   button:not([data-testid]),
  input:not([data-testid]),
  textarea:not([data-testid]),
  select:not([data-testid]),
  a:not([data-testid]),
  [role="button"]:not([data-testid]),
  [libAutoDataTestId]`,
})
export class AutoDataTestId implements AfterViewInit {
  private readonly strategy = new DataTestidGeneration();
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly element: HTMLElement = this.elementRef.nativeElement;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.generateAndSetDateTestid();
    }, 500);
  }

  private generateAndSetDateTestid(): void {
    if (!this.element || this.element.hasAttribute('data-testid')) {
      return;
    }

    const testId = this.strategy.generate(this.element);

    if (!testId || testId.length === 0) {
      console.warn('[AutoDataTestId] Generated empty data-testid, using fallback.');
      const fallbackId = this.element.tagName.toLowerCase() + '-' + Date.now();
      this.element.setAttribute('data-testid', fallbackId);
      return;
    }

    this.element.setAttribute('data-testid', testId);
  }
}
