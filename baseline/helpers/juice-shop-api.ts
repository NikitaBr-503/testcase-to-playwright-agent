import { APIRequestContext, expect } from '@playwright/test';
import { juiceShop } from './data';

type User = typeof juiceShop.users.registered;

/**
 * Test data set-up through the Juice Shop REST API (the same steps as apps/juice_shop_reset.py):
 * the registered user exists, and its basket, saved addresses and cards are empty.
 */
export class JuiceShopApi {
  constructor(private readonly request: APIRequestContext) {}

  async ensureUser(user: User = juiceShop.users.registered): Promise<void> {
    const res = await this.request.post('/api/Users', {
      data: {
        email: user.email,
        password: user.password,
        passwordRepeat: user.password,
        securityQuestion: { id: user.securityQuestionId },
        securityAnswer: user.securityAnswer,
      },
    });
    if (res.status() === 201) {
      const { data } = await res.json();
      await this.request.post('/api/SecurityAnswers', {
        data: { UserId: data.id, answer: user.securityAnswer, SecurityQuestionId: user.securityQuestionId },
      });
      return;
    }
    expect(res.status(), 'test user exists already').toBe(400);
  }

  async login(user: User = juiceShop.users.registered): Promise<{ token: string; bid: number }> {
    const res = await this.request.post('/rest/user/login', { data: { email: user.email, password: user.password } });
    expect(res.ok(), `login as ${user.email}`).toBeTruthy();
    const { authentication } = await res.json();
    return { token: authentication.token, bid: authentication.bid };
  }

  async resetUserState(user: User = juiceShop.users.registered): Promise<void> {
    await this.ensureUser(user);
    const { token, bid } = await this.login(user);
    const headers = { Authorization: `Bearer ${token}` };
    const basket = await (await this.request.get(`/rest/basket/${bid}`, { headers })).json();
    for (const product of basket.data.Products ?? []) {
      expect((await this.request.delete(`/api/BasketItems/${product.BasketItem.id}`, { headers })).ok()).toBeTruthy();
    }
    for (const collection of ['Addresss', 'Cards']) {
      const list = await (await this.request.get(`/api/${collection}`, { headers })).json();
      for (const entry of list.data ?? []) {
        expect((await this.request.delete(`/api/${collection}/${entry.id}`, { headers })).ok()).toBeTruthy();
      }
    }
  }
}
