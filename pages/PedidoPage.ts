import { Page, expect, APIRequestContext, Locator } from "@playwright/test"
import { PedidoApi } from "../api/PedidoApi"
import { buildPedidoPayload } from "../utils/pedidoFactory"
import { getPedidoData } from "../utils/pedidoStore"
import { getProduto } from "../utils/getProduto"
import { buildPedidoItemPayload } from "../utils/pedidoItemFactory"


export class Pedido {
    readonly page: Page

    // Locators Genéricos
    readonly addItemPedido: Locator
    readonly buttonSim: Locator
    readonly gridVazia: Locator
    readonly salvar: Locator

    // Locators cabeça pedido
    readonly inputCliente: Locator
    readonly validaPedido: Locator
    readonly inputCodigo: Locator
    readonly inputVendedor: Locator
    readonly inputCondicaoPagamento: Locator
    readonly inputFormaPagamento: Locator
    readonly inputListaPreco: Locator
    readonly inputFatorListaPreco: Locator
    readonly formValorTotal: Locator
    readonly input: Locator
    readonly pesquisaIcon: Locator
    readonly buttonMenuItem: Locator
    readonly btnSalvar: Locator
    readonly loocap: Locator
    readonly btnAssitDigit: Locator
    
    // Pop-up/ Janelas
    readonly assitDigit: Locator

    // Locators inclusão item
    readonly modalPedidoitem: Locator
    readonly gridPedido: Locator
    readonly inputProduto: Locator
    readonly inputTipoVenda: Locator
    readonly inputUnidade: Locator
    readonly inputQuantidade: Locator
    readonly inputVlrMaterial: Locator
    readonly inputDescontoPerc: Locator
    readonly vlrDescontoTotal: Locator
    readonly totalItem: Locator
    readonly salvarItem: Locator
    readonly cancelarItem: Locator
    readonly camposObrigatorios: Locator

    // Editar item
    readonly editarItem: Locator

    constructor(page: Page) {
        this.page = page

        // Genérico
        this.addItemPedido = page.locator('#adicionar-button:visible')
        this.buttonSim = page.locator('button:visible', { hasText: 'Sim' })
        this.gridVazia = page.locator('td[colspan="12"]')
        this.salvar = page.locator('div.modal-content button:visible', { hasText: 'Salvar' })

        // Cabeça pedido 
        this.inputCliente = page.locator('#form-input-cliente input.sc-lookup-input-value')
        this.inputCodigo = page.locator('#form-input-codigo input.sc-lookup-input-value')
        this.validaPedido = page.locator('#form-input-codigo')
        this.inputVendedor = page.locator('#form-input-vendedor input.sc-lookup-input-value')
        this.inputCondicaoPagamento = page.locator('#form-input-condicao-pagamento input.sc-lookup-input-value')
        this.inputFormaPagamento = page.locator('#form-input-forma-pagamento input.sc-lookup-input-value')
        this.inputListaPreco = page.locator('#form-input-lista-preco input.sc-lookup-input-value')
        this.inputFatorListaPreco = page.locator('div.col-md-12', { hasText: 'Fator lista Preço (Desconto)' }).locator('input.b-form-input:visible')
        this.formValorTotal = page.locator('#form-input-valor-total')
        this.input = page.locator('input.sc-lookup-input-value')
        this.pesquisaIcon = page.locator('#search-button')
        this.buttonMenuItem = page.locator('#menu-button:visible')
        this.btnSalvar = page.locator('id=form-button-salvar')
        this.loocap = page.locator('sc-lookup-input-value')
        this.btnAssitDigit = page.locator('#button-assistente-digitacao')

        // Pop-up/ Janelas
        this.modalPedidoitem = page.locator('div.modal-content:visible', {hasText: 'Itens do Pedido'})
        this.assitDigit = page.locator('div.modal-content:visible', {hasText:'Assistente de Digitação'})

        // Inclusão item
        this.gridPedido = page.locator('div.w-full td')
        this.inputProduto = page.locator('#form-input-produto input.sc-lookup-input-value')
        this.inputTipoVenda = page.locator('#form-input-tipo-venda input.sc-lookup-input-value')
        this.inputUnidade = page.locator('#form-input-unidade input.sc-lookup-input-value')
        this.inputQuantidade = page.locator('input#form-input-quantidade')
        // this.inputQuantidade = page.locator('#form-input-quantidade input.b-form-input')
        this.inputVlrMaterial = page.locator('div.col-sm-12', { hasText: 'Valor do Material' }).locator('input')
        this.inputDescontoPerc = page.locator('div.col-sm-12', { hasText: 'Desconto (%)' }).locator('input')
        this.vlrDescontoTotal = page.locator('div.col-sm-12', { hasText: 'Valor do Desconto Total' }).locator('input')
        this.totalItem = page.locator('.modal-footer span')
        this.salvarItem = page.locator('.modal-footer #form-button-salvar:visible')
        this.cancelarItem = page.locator('.modal-footer #form-button-cancelar:visible')
        this.camposObrigatorios = page.locator('#form-input-produto input.sc-lookup-input-value.form-control.is-invalid')

        // Editar item
        this.editarItem = page.locator('td.h-100 i.fa-lg.text-success')

    }

    async pedidos() {
        await this.page.goto('/pedidos')
    }

    async novoPedido() {
        await this.addItemPedido.click()
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

    async criarPedidoViaApi(cenario: string): Promise<number> {
        const pedidoApi = new PedidoApi(this.page)
        const payload = buildPedidoPayload("pedidoItem")
        await pedidoApi.newPedido(cenario, payload)

        const data = getPedidoData(cenario)
        const pedidoId = data.pedidoId

        console.log('Pedido criado com o id:', pedidoId)

        return pedidoId
    }

    async adicionarItensViaApi(pedidoId: number, cenario: string, produtos: string[]) {
        const pedidoApi = new PedidoApi(this.page)
        const itensCriados: number[] = []
        for (const produto of produtos) {
            const item = getProduto(produto)
            const payload = buildPedidoItemPayload(pedidoId, item)
            await pedidoApi.newPedidItem(cenario, payload)
            const data = getPedidoData(cenario)
            // const pedidoItemId = data.pedidoItemId

            itensCriados.push(data.pedidoItemId)

            // console.log('Item Criado com o id:', pedidoItemId)
        }
    }

}
