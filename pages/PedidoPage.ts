import { Page, expect, APIRequestContext,Locator } from "@playwright/test"


export class Pedido {
    readonly page: Page

    //Locators
    readonly addPedido : Locator
    readonly inputCliente : Locator
    readonly inputVendedor : Locator
    readonly inputCondicaoPagamento : Locator
    readonly inputFormaPagamento : Locator
    readonly inputListaPreco : Locator
    readonly btnSalvar : Locator

    constructor(page: Page) {
        this.page = page

        this.addPedido = page.locator('id=adicionar-button')
        this.inputCliente = page.locator('id=form-input-cliente')
        this.inputVendedor = page.locator('id=form-input-vendedor')
        this.inputCondicaoPagamento = page.locator('id=form-input-condicao-pagamento')
        this.inputFormaPagamento = page.locator('id=form-input-forma-pagamento')
        this.inputListaPreco = page.locator('id=form-input-lista-preco')
        this.btnSalvar = page.locator('id=form-button-salvar')
    }

    async novoPedido() {
        await this.addPedido.click()
    }

    async verificarTelaNovoPedido() {
        const cadastroPedido = this.inputCliente
        await expect(cadastroPedido).toBeVisible()
    }

    async caracteresInvalidos(campo: string, valor: string) {
        await this.page.locator(`id=form-input-${campo}`).locator('input.sc-lookup-input-value').fill(valor)
    }

    async preencherCabecaPedido(cliente: string, vendedor: string, condicaoPagamento: string, formaPagamento: string, listaPreco: string) {
        await this.inputCliente.locator('input.sc-lookup-input-value').fill(cliente)
        await this.inputVendedor.locator('input.sc-lookup-input-value').fill(vendedor)
        await this.inputCondicaoPagamento.locator('input.sc-lookup-input-value').fill(condicaoPagamento)
        await this.inputFormaPagamento.locator('input.sc-lookup-input-value').fill(formaPagamento)
        await this.inputListaPreco.locator('input.sc-lookup-input-value').fill(listaPreco)
    }

    async submitPedido() {
        await this.btnSalvar.click()
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
