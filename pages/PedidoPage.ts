import { Page, expect, APIRequestContext, Locator } from "@playwright/test"


export class Pedido {
    readonly page: Page

    //Locators cabeça pedido
    readonly addPedido: Locator
    readonly inputCliente: Locator
    readonly inputCodigo: Locator
    readonly inputVendedor: Locator
    readonly inputCondicaoPagamento: Locator
    readonly inputFormaPagamento: Locator
    readonly inputListaPreco: Locator
    readonly input: Locator
    readonly pesquisaIcon: Locator
    readonly btnSalvar: Locator
    readonly loocap: Locator

    //locators inclusão item
    readonly modalPedidoitem: Locator
    readonly inputProduto: Locator
    readonly inputTipoVenda: Locator
    readonly inputUnidade: Locator
    readonly inputQuantidade: Locator
    readonly totalItem: Locator
    readonly salvarItem: Locator


    constructor(page: Page) {
        this.page = page

        // cabeça pedido 
        this.addPedido = page.locator('#adicionar-button')
        this.inputCliente = page.locator('id=form-input-cliente')
        this.inputCodigo = page.locator('#form-input-codigo')
        this.inputVendedor = page.locator('id=form-input-vendedor')
        this.inputCondicaoPagamento = page.locator('id=form-input-condicao-pagamento')
        this.inputFormaPagamento = page.locator('id=form-input-forma-pagamento')
        this.inputListaPreco = page.locator('id=form-input-lista-preco')
        this.input = page.locator('input.sc-lookup-input-value')
        this.pesquisaIcon = page.locator('#search-button')
        this.btnSalvar = page.locator('id=form-button-salvar')
        this.loocap = page.locator('sc-lookup-input-value')

        // inclusão item
        this.inputProduto = page.locator('#form-input-produto input.sc-lookup-input-value')
        this.modalPedidoitem = page.locator('div .modal-content')
        this.inputTipoVenda = page.locator('#form-input-tipo-venda input.sc-lookup-input-value')
        this.inputUnidade = page.locator('#form-input-unidade input.sc-lookup-input-value')
        this.inputQuantidade = page.locator('#form-input-quantidade input.b-form-input')
        this.totalItem = page.locator('.modal-footer span')
        this.salvarItem = page.locator('.modal-footer #form-button-salvar')
        

    }

    async pedidos() {
        await this.page.goto('/pedidos')
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

    async validarCamposPreenchidos() {
        // await expect(this.inputCliente.locator).toBeVisible()
    }

    async submitPedido() {
        await this.btnSalvar.click()
    }
    async pesquisarPedido(pedidoId: number) {
    }

    async salvarPedidoId(): Promise<number> {
        const [response] = await Promise.all([
            this.page.waitForResponse(r => r.url().includes('/v1/pedido') && r.status() === 200),
            this.submitPedido()])

        const body = await response.json()
        const pedidoId = body.data.pedidoId
        return pedidoId
    }

    async deletePedido( pedidoId: number) {
        // return await this.requestContext.delete(`/v1/pedido/${pedidoId}`)
    }

    async deletePedidoInterno(api: APIRequestContext, pedidoId: number) {
        const response = await api.delete(
            `http://192.168.193.202:5001/v1/pedido/${pedidoId}`
        )

        console.log('Status:', response.status())
        console.log('Body:', await response.text())

        expect([200, 202, 204]).toContain(response.status())

        return response
    }


}
