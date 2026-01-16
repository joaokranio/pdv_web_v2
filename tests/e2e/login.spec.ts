import { test, expect } from '@playwright/test'
import { Login } from '../../pages/LoginPage'
import { Logada } from '../../pages/HomePage'
import { ENV } from '../../utils/env'
import { Toast } from '../../components/Toast'
// import { Logada } from './support/actions/arealogada'

test.beforeEach(async ({ page }) => {
    const login: Login = new Login(page)
    await login.go()
})

test('Deve permitir login com credenciais válidas', async ({ page }) => {
    //Dado que preencho os campos com usuário se senha válido
    const login: Login = new Login(page)
    const logada: Logada = new Logada(page)
    await login.user(ENV.USER)
    await login.pass(ENV.PASSWORD)

    // E selecionei a filial
    await login.filial(1)

    //Quando clico no botão "Entrar"
    await login.submmit()

    //Então devo ver a pagina logada do sistema
    await logada.logado()
})

test('Não deve permitir login com usuário inválido', async ({ page }) => {
    // Dado que eu tente digitar um usuário incorreto.
    const message = 'Erro ao tentar realizar a ação. Por favor, tente novamente mais tarde!'
    const login: Login = new Login(page)
    const toast: Toast = new Toast(page)
    await login.user('SSSSSS')

    // Quando tento digitar o campo senha.
    await page.locator('id=login-input-senha').click()

    // Então o sistema exibe uma mensagem de erro.
    await toast.toast(message)
})

test('Deve exibir toast ao falhar login', async ({ page }) => {
    // Dado que eu digite o usuário correto porém a senha incorreta.
    const login: Login = new Login(page)
    const toast: Toast = new Toast(page)
    const message1 = 'ATENÇÃO! Credenciais inválidas.Verifique se digitou corretamente.'
    const message2 = 'Action not performed'
    await login.user(ENV.USER)
    await login.pass('SSSSS')

    // E selecionei a filial
    await login.filial(1)

    //Quando clico no botão "Entrar"
    await login.submmit()

    // Então o sistema exibe uma mensagem de erro.
    await toast.toast(message1)
    await toast.toast(message2)
})

test('Validar campos obrigatórios', async ({ page }) => {
    // Dado que eu não preencha os campos na area de lgin.
    const login: Login = new Login(page)

    // Quando clico no botão entrar.
    await login.submmit()

    // Então o sistema me informa que os campos são obrigatórios.
    await login.placeHolder()

})


