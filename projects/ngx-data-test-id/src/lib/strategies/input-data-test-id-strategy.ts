import { BaseDataTestidGenerationStrategy } from './date-test-id-generation.strategy';

export class InputDataTestIdStrategy extends BaseDataTestidGenerationStrategy {
  priority = 2;

  override canHandle(element: HTMLElement): boolean {
    const tagName = element.tagName.toLowerCase();
    return tagName === 'input' || tagName === 'textarea';
  }

  override generate(element: HTMLElement): string | null {
    const type = this.getInputType(element);
    const identifier = this.getInputIdentifier(element);

    let baseId = '';

    if (identifier) {
      baseId = `${type}-${identifier}`;
    }

    baseId = this.sanitize(baseId || type);
    return this.resolveCollisions(baseId, element);
  }

  private getInputType(element: HTMLElement): string {
    const tagName = element.tagName.toLowerCase();
    if (tagName === 'textarea') {
      return 'textarea';
    }

    const type = element.getAttribute('type') || 'text';
    const typeMap: Record<string, string> = {
      text: 'input-text',
      email: 'input-email',
      password: 'input-password',
      tel: 'input-phone',
      url: 'input-url',
      search: 'input-search',
      number: 'input-number',
      date: 'input-date',
      time: 'input-time',
      'datetime-local': 'input-datetime',
      checkbox: 'input-checkbox',
      radio: 'input-radio',
      file: 'input-file',
      hidden: 'input-hidden',
      submit: 'input-submit',
      reset: 'input-reset',
      button: 'input-button',
    };

    return typeMap[type.toLowerCase()] || type.toLowerCase();
  }

  private getInputIdentifier(element: HTMLElement): string | null {
    const name = element.getAttribute('name');
    if (name) {
      return name.trim();
    }

    const placeHolder = element.getAttribute('placeholder');
    if (!placeHolder) {
      return null;
    }

    return placeHolder.trim();
  }
}
