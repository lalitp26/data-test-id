import { AfterViewInit, Directive } from '@angular/core';

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
export class AutoDataTestId {}
