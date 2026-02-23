import { Page, expect, APIRequestContext, Locator } from "@playwright/test"


export class Pedido {
    readonly page: Page
    
    // Locators Genéricos
    readonly addPedido: Locator

    // Locators cabeça pedido
    readonly inputCliente: Locator
    readonly validaPedido: Locator
    readonly inputCodigo: Locator
    readonly inputVendedor: Locator
    readonly inputCondicaoPagamento: Locator
    readonly inputFormaPagamento: Locator
    readonly inputListaPreco: Locator
    readonly formValorTotal: Locator
    readonly input: Locator
    readonly pesquisaIcon: Locator
    readonly btnSalvar: Locator
    readonly loocap: Locator

    // Locators inclusão item
    readonly modalPedidoitem: Locator
    readonly gridPedido: Locator
    readonly inputProduto: Locator
    readonly inputTipoVenda: Locator
    readonly inputUnidade: Locator
    readonly inputQuantidade: Locator
    readonly inputVlrMaterial: Locator
    readonly totalItem: Locator
    readonly salvarItem: Locator
    readonly cancelarItem: Locator

    // Editar item
    readonly editarItem : Locator

    constructor(page: Page) {
        this.page = page

        // Genérico
        this.addPedido = page.locator('#adicionar-button:visible')

        // Cabeça pedido 
        this.inputCliente = page.locator('#form-input-cliente input.sc-lookup-input-value')
        this.inputCodigo = page.locator('#form-input-codigo input.sc-lookup-input-value')
        this.validaPedido = page.locator('#form-input-codigo')
        this.inputVendedor = page.locator('#form-input-vendedor input.sc-lookup-input-value')
        this.inputCondicaoPagamento = page.locator('#form-input-condicao-pagamento input.sc-lookup-input-value')
        this.inputFormaPagamento = page.locator('#form-input-forma-pagamento input.sc-lookup-input-value')
        this.inputListaPreco = page.locator('#form-input-lista-preco input.sc-lookup-input-value')
        this.formValorTotal = page.locator('#form-input-valor-total')
        this.input = page.locator('input.sc-lookup-input-value')
        this.pesquisaIcon = page.locator('#search-button')
        this.btnSalvar = page.locator('id=form-button-salvar')
        this.loocap = page.locator('sc-lookup-input-value')

        // Inclusão item
        this.gridPedido = page.locator('div.w-full td')
        this.inputProduto = page.locator('#form-input-produto input.sc-lookup-input-value')
        this.modalPedidoitem = page.locator('div .modal-content')
        this.inputTipoVenda = page.locator('#form-input-tipo-venda input.sc-lookup-input-value')
        this.inputUnidade = page.locator('#form-input-unidade input.sc-lookup-input-value')
        this.inputQuantidade = page.locator('#form-input-quantidade input.b-form-input')
        this.inputVlrMaterial = page.locator('div.col-sm-12', { hasText: 'Valor do Material' }).getByRole('textbox')
        this.totalItem = page.locator('.modal-footer span')
        this.salvarItem = page.locator('.modal-footer #form-button-salvar:visible')
        this.cancelarItem = page.locator('.modal-footer #form-button-cancelar:visible')
        
        // Editar item
        this.editarItem = page.locator('td.h-100 i.fa-lg.text-success')

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
        await this.inputCliente.fill(cliente)
        await this.inputVendedor.fill(vendedor)
        await this.inputCondicaoPagamento.fill(condicaoPagamento)
        await this.inputFormaPagamento.fill(formaPagamento)
        await this.inputListaPreco.fill(listaPreco)
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
