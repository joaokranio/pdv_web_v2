import { Page, APIResponse, expect } from '@playwright/test'
import { ENV } from '../utils/env'

export class PedidoApi {
  private request;
  private apiUrl: string;

  constructor(page: Page) {
    this.request = page.request;
    this.apiUrl = process.env.API_URL as string
  }

  async deletarPedido(pedidoId: number){
    const response = await this.request.delete(`${ENV.PAGE_API}/v1/pedido/${pedidoId}`);

    console.log(await response.text())
    // expect(response.ok()).toBeTruthy();

    return response;
  }
}
