import { test, expect } from '@playwright/test'
import { Login } from '../../pages/LoginPage'
import { ENV } from '../../utils/env'
import { Logada } from '../../pages/HomePage'

test.beforeEach(async ({ page }) => {
    const login: Login = new Login(page)
    await login.login(ENV.USER, ENV.PASSWORD,1)
})

test('Menu superior direito - area logada.', async ({ page }) => {
    // Dado que estou na area logada do sistema 
    const logada: Logada = new Logada(page)
    await logada.logado()

    // Quando clico no canto superior direito 
    await logada.menuSuperior.click()

    // Então deve abrir um menu com 3 opções
    await page.locator('ul.dropdown-menu').focus()
})

test('Logoff do sistema', async ({ page }) => {
    // Dado que estou logado no sistema.
    const logada: Logada = new Logada(page)
    const login: Login = new Login(page)
    await logada.logado()

    // Quando clico para sair do sistema.
    await logada.menuSuperior.click()
    await logada.sair.click()

    // Então devo ser redirecionado para a pagina de login do sistema.
    await expect(login.loginH1).toBeVisible()
})

test.describe('Retorno para a pagina inicial ', () => {
    test.beforeEach(async ({ page }) => {
        const logada: Logada = new Logada(page)
        await logada.logado()
        await logada.clientes.click()
    })
    test('Menu Pagina Inicial', async ({ page }) => {
        // Dado que estou logado no sistema.
        const logada: Logada = new Logada(page)
        await logada.logado()

        // Quando clico no menu "Pagina Inicial".
        await logada.home.click()

        // Então devo ser redirecionado para a pagina inicial da área logada do sistema.
        const message = 'pagina inicial'
        await logada.validarMenu(message)
    })
})

test('Menu Cliente', async ({ page }) => {
    // Dado que estou logado no sistema.
    const logada: Logada = new Logada(page)
    await logada.logado()

    // Quando clico no menu "Clientes".
    await logada.clientes.click()

    // Então devo ser redirecionado para a pagina de cadastro de clientes.
    const message = 'Clientes'
    await logada.validarMenu(message)
})

test('Menu Pedido de Venda', async ({ page }) => {
    // Dado que estou logado no sistema.
    const logada: Logada = new Logada(page)
    await logada.logado()

    // Quando clico no menu "Pedido de Venda".
    await logada.pedidoVenda.click()

    // Então devo ser redirecionado para a pagina de cadastro de Pedidos.
    const message = 'Pedidos'
    await logada.validarMenu(message)
})

test('Menu Pedidos de Compra a Confirmar', async ({ page }) => {
    // Dado que estou logado no sistema.
    const logada: Logada = new Logada(page)
    await logada.logado()

    // Quando clico no menu "Pedidos de Compra a Confirmar".
    await logada.pedidosCompra.click()

    // Então devo ser redirecionado para a pagina Pedidos de Compra a Confirmar.
    const message = 'Pedidos compra'
    await logada.validarMenu(message)
})

test('Menu Negativas', async ({ page }) => {
    // Dado que estou logado no sistema.
    const logada: Logada = new Logada(page)
    await logada.logado()

    // Quando clico no menu "Pedidos de Compra a Confirmar".
    await logada.negativas.click()

    // Então devo ser redirecionado para a pagina Pedidos de Compra a Confirmar.
    const message = 'Negativas'
    await logada.validarMenu(message)
})

test('Menu Lista de Materiais', async ({ page }) => {
    // Dado que estou logado no sistema.
    const logada: Logada = new Logada(page)
    await logada.logado()

    // Quando clico no menu "Lista de Materiais".
    await logada.listaMateriais.click()

    // Então devo ser redirecionado para a pagina Lista de Materiais.
    const message = 'Materiais'
    await logada.validarMenu(message)
})

test('Menu Listas de Preço', async ({ page }) => {
    // Dado que estou logado no sistema.
    const logada: Logada = new Logada(page)
    await logada.logado()

    // Quando clico no menu "Listas de Preço".
    await logada.listaPreco.click()

    // Então devo ser redirecionado para a pagina Listas de Preço.
    const message = 'listas preco'
    await logada.validarMenu(message)
})

test('Menu indicadores', async ({ page }) => {
    // Dado que estou logado no sistema.
    const logada: Logada = new Logada(page)
    await logada.logado()

    // Quando clico no menu "indicadores".
    await logada.indicadores.click()

    // Então devo ser redirecionado para a pagina indicadores.
    const message = 'Indicadores'
    await logada.validarMenu(message)
})
