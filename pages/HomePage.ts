import { Page, expect, Locator } from "@playwright/test"

export class Logada {
    readonly page: Page

    //Locators
    readonly menuSuperior: Locator
    readonly paginaAtiva: Locator
    readonly menuEsquerdo: Locator
    readonly sair: Locator
    readonly clientes: Locator
    readonly pedidoVenda: Locator
    readonly pedidosCompra: Locator
    readonly negativas: Locator
    readonly listaMateriais: Locator
    readonly listaPreco: Locator
    readonly indicadores: Locator
    readonly home: Locator

    constructor(page: Page) {
        this.page = page

        this.menuSuperior = page.locator('button.dropdown-toggle')
        this.paginaAtiva = page.locator('.breadcrumb span.active')
        this.menuEsquerdo = page.locator('.sidebar')
        this.sair = page.locator('id=header-user-info-option-sair')
        this.clientes = page.locator('id=sidebar-clientes')
        this.pedidoVenda = page.locator('id=sidebar-pedidos-venda')
        this.pedidosCompra = page.locator('id=sidebar-pedidos-compra')
        this.negativas = page.locator('id=sidebar-negativas')
        this.listaMateriais = page.locator('id=sidebar-lista-materiais')
        this.listaPreco = page.locator('id=sidebar-lista-preco')
        this.indicadores = page.locator('id=sidebar-indicadores')
        this.home = page.locator('id=sidebar-home')
    }

    async areaLogada () {
        await this.page.goto('/pagina-inicial')
    }

    async logado() {
        await expect(this.menuSuperior).toBeVisible()
    }

    async validarResponsividade(isMobile: boolean) {
        const menu = this.menuEsquerdo

        if (isMobile) {
            await expect(menu).not.toBeVisible()
        } else {
            await expect(menu).toBeVisible()
        }
    }

    async validarMenu(nomeMenu: string) {
        await expect(this.paginaAtiva.filter({ hasText: nomeMenu })).toBeVisible()
    }

}