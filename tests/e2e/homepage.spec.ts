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
    await page.locator('span.logged-user-info-content').click()

    // Então deve abrir um menu com 3 opções
    await page.locator('ul.dropdown-menu').focus()
})

test('Logoff do sistema', async ({ page }) => {
    // Dado que estou logado no sistema.
    const logada: Logada = new Logada(page)
    await logada.logado()

    // Quando clico para sair do sistema.
    await page.locator('span.logged-user-info-content').click()
    await page.locator('id=header-user-info-option-sair').click()

    // await page.waitForTimeout(9000)

    // Então devo ser redirecionado para a pagina de login do sistema.
    await page.locator('span.login100-form-title').focus()
})

test.describe('Retorno para a pagina inicial ', () => {
    test.beforeEach(async ({ page }) => {
        const logada: Logada = new Logada(page)
        await logada.logado()
        await page.locator('id=sidebar-clientes').click()
    })
    test('Menu Pagina Inicial', async ({ page }) => {
        // Dado que estou logado no sistema.
        const logada: Logada = new Logada(page)
        await logada.logado()

        // Quando clico no menu "Pagina Inicial".
        await page.locator('id=sidebar-home').click()

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
    await page.locator('id=sidebar-clientes').click()

    // Então devo ser redirecionado para a pagina de cadastro de clientes.
    const message = 'Clientes'
    await logada.validarMenu(message)
})

test('Menu Pedido de Venda', async ({ page }) => {
    // Dado que estou logado no sistema.
    const logada: Logada = new Logada(page)
    await logada.logado()

    // Quando clico no menu "Pedido de Venda".
    await page.locator('id=sidebar-pedidos-venda').click()

    // Então devo ser redirecionado para a pagina de cadastro de Pedidos.
    const message = 'Pedidos'
    await logada.validarMenu(message)
})

test('Menu Pedidos de Compra a Confirmar', async ({ page }) => {
    // Dado que estou logado no sistema.
    const logada: Logada = new Logada(page)
    await logada.logado()

    // Quando clico no menu "Pedidos de Compra a Confirmar".
    await page.locator('id=sidebar-pedidos-compra').click()

    // Então devo ser redirecionado para a pagina Pedidos de Compra a Confirmar.
    const message = 'Pedidos compra'
    await logada.validarMenu(message)
})

test('Menu Negativas', async ({ page }) => {
    // Dado que estou logado no sistema.
    const logada: Logada = new Logada(page)
    await logada.logado()

    // Quando clico no menu "Pedidos de Compra a Confirmar".
    await page.locator('id=sidebar-negativas').click()

    // Então devo ser redirecionado para a pagina Pedidos de Compra a Confirmar.
    const message = 'Negativas'
    await logada.validarMenu(message)
})

test('Menu Lista de Materiais', async ({ page }) => {
    // Dado que estou logado no sistema.
    const logada: Logada = new Logada(page)
    await logada.logado()

    // Quando clico no menu "Lista de Materiais".
    await page.locator('id=sidebar-lista-materiais').click()

    // Então devo ser redirecionado para a pagina Lista de Materiais.
    const message = 'Materiais'
    await logada.validarMenu(message)
})

test('Menu Listas de Preço', async ({ page }) => {
    // Dado que estou logado no sistema.
    const logada: Logada = new Logada(page)
    await logada.logado()

    // Quando clico no menu "Listas de Preço".
    await page.locator('id=sidebar-lista-preco').click()

    // Então devo ser redirecionado para a pagina Listas de Preço.
    const message = 'Listas de Preco'
    await logada.validarMenu(message)
})

test('Menu indicadores', async ({ page }) => {
    // Dado que estou logado no sistema.
    const logada: Logada = new Logada(page)
    await logada.logado()

    // Quando clico no menu "indicadores".
    await page.locator('id=sidebar-indicadores').click()

    // Então devo ser redirecionado para a pagina indicadores.
    const message = 'Indicadores'
    await logada.validarMenu(message)
})
