import { Page, APIResponse, expect } from '@playwright/test'
import { ENV } from '../utils/env'
import console from 'node:console'
import { savePedidoId,savePedidoItemId } from '../utils/pedidoStore'


export class PedidoApi {
  private page: Page
  private request
  private apiUrl: string

  constructor(page: Page) {
    this.page = page
    this.request = page.request
    this.apiUrl = ENV.PAGE_API
  }

  private async getToken(): Promise<string> {
    const token = await this.page.evaluate(() => {
      return localStorage.getItem('X_SECTRA_ACCESS_TOKEN')
    })
    if (!token) {
      throw new Error('Token não encontrado no localStorage')
    }
    return token
  }

  //Novo Pedido
  async newPedido(context: string, payload: any): Promise<APIResponse> {
    const token = await this.getToken()

    const response = await this.request.post(`${this.apiUrl}/v1/pedido/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: payload
    })

    expect(response.ok()).toBeTruthy()
    const body = await response.json()
    const pedidoId = body.data?.pedidoId

    if (!pedidoId) {
      throw new Error(`PedidoId não retornado pela API.Response: ${JSON.stringify(body)}`)
    }

    savePedidoId(context, pedidoId)
    console.log(`Pedido criado: ${pedidoId} | Contexto: ${context}`)

    return response
  }

  // Editar Pedido
  async editPedido(): Promise<APIResponse> {
    const token = await this.getToken()

    const response = await this.request.put(`${this.apiUrl}/v1/pedido/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'aplication/json'
      }
    })
    console.log('status:', response.status())
    console.log('Body:', await response.status())
    return response
  }

  // Deletar pedido
  async deletarPedido(pedidoId: number): Promise<APIResponse> {
    const token = await this.getToken()

    const response = await this.request.delete(`${this.apiUrl}/v1/pedido/${pedidoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    console.log('Status:', response.status())
    console.log('Body:', await response.status())

    return response
  }

  // Inserir item no pedido
  // async newPedidoItem(): Promise<APIResponse> {
  //   const token = await this.getToken()

  //   const response = await this.request.post(`${this.apiUrl}/v1/pedidoItem/`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       'Content-Type': 'aplication/json'
  //     }
  //   })
  //   console.log('status:', response.status())
  //   console.log('Body:', await response.status())
  //   return response
  // }

  async newPedidItem(payload: any): Promise<APIResponse> {
    const token = await this.getToken()

    const response = await this.request.post(`${this.apiUrl}/v1/pedidoItem`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: payload
    })

    expect(response.ok()).toBeTruthy()
    const body = await response.json()
    const pedidoItemId = body.data?.pedidoItemId

    if (!pedidoItemId) {
      throw new Error(`PedidoItemId não retornado pela API. Response: ${JSON.stringify(body)}`)
    }

    console.log(`Item incluído: ${pedidoItemId} | Pedido: ${payload.pedidoId}`)

    return response
  }

  // ===================================================================
    async newPedidItemII(context: string, payload: any): Promise<APIResponse> {
    const token = await this.getToken()

    const response = await this.request.post(`${this.apiUrl}/v1/pedidoItem/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: payload
    })

    expect(response.ok()).toBeTruthy()
    const body = await response.json()
    const pedidoItemId = body.data?.pedidoItemId

    if (!pedidoItemId) {
      throw new Error(`PedidoId não retornado pela API.Response: ${JSON.stringify(body)}`)
    }

    savePedidoItemId(context, pedidoItemId)
    console.log(`Item criado: ${pedidoItemId} | Contexto: ${context}`)

    return response
  }

  // ===================================================================

  // Editar item no pedido
  async editPedidoItem(): Promise<APIResponse> {
    const token = await this.getToken()

    const response = await this.request.put(`${this.apiUrl}/v1/pedidoItem/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'aplication/json'
      }
    })
    console.log('status:', response.status())
    console.log('Body:', await response.status())
    return response
  }

  // Deletar item do pedido 
  async deletarItem(itemId: number): Promise<APIResponse> {
    const token = await this.getToken()

    const response = await this.request.delete(`${this.apiUrl}/v1/pedidoItem/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'aplication/json'
      }
    })
    console.log('Status:', response.status())
    console.log('Body:', await response.status())

    return response
  }


}