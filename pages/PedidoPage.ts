import { Page, expect, APIRequestContext } from "@playwright/test"
import { ENV } from '../utils/env'
import { request } from "node:http"


export class Pedido {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async novoPedido() {
        await this.page.locator('id=adicionar-button').click()
    }

    async verificarTelaNovoPedido() {
        const cadastroPedido = this.page.locator('id=form-input-cliente')
        await expect(cadastroPedido).toBeVisible()
    }

    async caracteresInvalidos(campo: string, valor: string) {
        await this.page.locator(`id=form-input-${campo}`).locator('input.sc-lookup-input-value').fill(valor)
    }

    async preencherCabecaPedido(cliente: string, vendedor: string, condicaoPagamento: string, formaPagamento: string, listaPreco: string) {
        await this.page.locator('id=form-input-cliente').locator('input.sc-lookup-input-value').fill(cliente)
        await this.page.locator('id=form-input-vendedor').locator('input.sc-lookup-input-value').fill(vendedor)
        await this.page.locator('id=form-input-condicao-pagamento').locator('input.sc-lookup-input-value').fill(condicaoPagamento)
        await this.page.locator('id=form-input-forma-pagamento').locator('input.sc-lookup-input-value').fill(formaPagamento)
        await this.page.locator('id=form-input-lista-preco').locator('input.sc-lookup-input-value').fill(listaPreco)
    }

    async submitPedido() {
        await this.page.locator('id=form-button-salvar').click()
    }

    async salvarPedidoId(): Promise<number> {
        const [response] = await Promise.all([
            this.page.waitForResponse(r => r.url().includes('/v1/pedido') && r.status() === 200),
            this.submitPedido()])

        const body = await response.json()
        const pedidoId = body.data.pedidoId
        return pedidoId
    }

    async deletePedido(api: APIRequestContext, pedidoId: number) {
        const response = await api.delete(`/v1/pedido/${pedidoId}`)
        expect(response.ok()).toBeTruthy()
        return response
    }



}
