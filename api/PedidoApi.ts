import { Page, APIResponse, expect } from '@playwright/test'
import { ENV } from '../utils/env'

export class PedidoApi {
  private page: Page 
  private request
  private apiUrl: string

  constructor(page: Page) {
    this.page = page
    this.request = page.request
    this.apiUrl = ENV.PAGE_API
  }

  private async getToken(): Promise<string>{
    const token = await this.page.evaluate(()=>{
      return localStorage.getItem('X_SECTRA_ACCESS_TOKEN')
    })

    if (!token) {
      throw new Error('Token não encontrado no localStorage')
    }

    return token
  }

  async deletarPedido(pedidoId: number): Promise<APIResponse>{
    const token = await this.getToken()

    const response = await this.request.delete(`${this.apiUrl}/v1/pedido/${pedidoId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    console.log('Status:', response.status())
    console.log('Body:', await response.status())

    return response;
  }
}
