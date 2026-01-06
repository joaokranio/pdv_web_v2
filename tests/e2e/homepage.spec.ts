import { test, expect } from '@playwright/test'
import { Login } from '../../pages/LoginPage'
import { Logada } from '../../pages/HomePage'

test.beforeEach(async ({ page }) => {
    const login: Login = new Login(page)
    await login.go()
})

test('Menu superior direito - area logada.', async ({page })=>{
    // Dado que estou na area logada do sistema 

    // Quando clico no canto superior direito 

    // Então deve abrir um menu com 3 opções
})

test('Logoff do sistema', async ({page})=>{
    // Dado que estou logado no sistema.

    // Quando clico para sair do sistema.

    // Então devo ser redirecionado para a pagina de login do sistema.

})

test('Menu Pagina Inicial', async ({page})=>{
    // Dado que estou logado no sistema.

    // E em qualquer menu do sistema.

    // Quando clico no menu "Pagina Inicial".

    // Então devo ser redirecionado para a pagina inicial da área logada do sistema.

})

test('Menu Cliente', async ({page})=>{
    // Dado que estou logado no sistema.

    // Quando clico no menu "Clientes".

    // Então devo ser redirecionado para a pagina de cadastro de clientes.

})

test('Menu Pedido de Venda', async ({page})=>{
    // Dado que estou logado no sistema.

    // Quando clico no menu "Pedido de Venda".

    // Então devo ser redirecionado para a pagina de cadastro de Pedidos.

})

test('Menu Pedidos de Compra a Confirmar', async ({page})=>{
    // Dado que estou logado no sistema.

    // Quando clico no menu "Pedidos de Compra a Confirmar".

    // Então devo ser redirecionado para a pagina Pedidos de Compra a Confirmar.

})

test('Menu Lista de Materiais', async ({page})=>{
    // Dado que estou logado no sistema.

    // Quando clico no menu "Lista de Materiais".

    // Então devo ser redirecionado para a pagina Lista de Materiais.

})

test('Menu Listas de Preço', async ({page})=>{
    // Dado que estou logado no sistema.

    // Quando clico no menu "Listas de Preço".

    // Então devo ser redirecionado para a pagina Listas de Preço.

})

test('Menu indicadores', async ({page})=>{
    // Dado que estou logado no sistema.

    // Quando clico no menu "indicadores".

    // Então devo ser redirecionado para a pagina indicadores.

})
