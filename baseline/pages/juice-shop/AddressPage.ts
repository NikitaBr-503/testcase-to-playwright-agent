import { Locator, Page } from '@playwright/test';
import { juiceShop } from '../../helpers/data';

type Address = typeof juiceShop.addresses.kyiv;

/** "My saved addresses" and the "Add New Address" form. */
export class AddressPage {
  readonly addButton: Locator;
  readonly submitButton: Locator;

  constructor(private readonly page: Page) {
    this.addButton = page.getByRole('button', { name: 'Add a new address' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }

  private field(placeholder: string): Locator {
    return this.page.getByPlaceholder(placeholder);
  }

  get country() { return this.field('Please provide a country.'); }
  get name() { return this.field('Please provide a name.'); }
  get mobile() { return this.field('Please provide a mobile number.'); }
  get zip() { return this.field('Please provide a ZIP code.'); }
  get street() { return this.field('Please provide an address.'); }
  get city() { return this.field('Please provide a city.'); }
  get state() { return this.field('Please provide a state.'); }

  async fill(address: Address) {
    await this.country.fill(address.country);
    await this.name.fill(address.name);
    await this.mobile.fill(address.mobile);
    await this.zip.fill(address.zip);
    await this.street.fill(address.street);
    await this.city.fill(address.city);
    await this.state.fill(address.state);
  }

  savedAddress(name: string): Locator {
    return this.page.locator('mat-row, [role="row"]').filter({ hasText: name });
  }
}
