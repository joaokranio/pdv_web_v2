import { Locator, Page, expect } from "@playwright/test"
import { ENV } from '../utils/env'

export class Login {
    readonly page: Page

    //Locators
    readonly inputUsuario : Locator
    readonly inputSenha : Locator
    readonly selecFilial : Locator
    readonly btnEntrar : Locator

    constructor(page: Page) {
        this.page = page

        this.inputUsuario = page.locator('id=login-input-usuario')
        this.inputSenha = page.locator('id=login-input-senha')
        this.selecFilial = page.locator('id=login-select-filial')
        this.btnEntrar = page.locator('id=login-button-entrar')
    }

    async go() {
        await this.page.goto(ENV.PAGE_URL)
    }

    // async user(Usuario: string) {
    //     await this.page.locator('id=login-input-usuario').fill(Usuario.toString())
    // }
    async preencherUsuario(Usuario: string) {
        await this.inputUsuario.fill(Usuario)
    }

    // async pass(password: string) {
    //     await this.page.locator('id=login-input-senha').fill(password.toString())
    // }

    async preencherSenha(password: string) {
        await this.inputSenha.fill(password)
    }

    // async filial(filial: number) {
    //     await this.page.locator('id=login-select-filial').selectOption(filial.toString())
    // }
    async preencherFilial(filial: number) {
        await this.selecFilial.selectOption(filial.toString())
    }

    // async submmit() {
    //     await this.page.locator('id=login-button-entrar').click()
    // }

    async submmit() {
        await this.btnEntrar.click()
    }

    // async placeHolder() {
    //     await expect(this.page.locator('id=login-input-usuario')).toHaveAttribute('placeholder', 'O campo apelido é obrigatório')
    //     await expect(this.page.locator('id=login-input-senha')).toHaveAttribute('placeholder', 'O campo senha é obrigatório')
    // }

    async placeHolder() {
        await expect(this.inputUsuario)
            .toHaveAttribute('placeholder', 'O campo apelido é obrigatório')
        await expect(this.inputSenha)
            .toHaveAttribute('placeholder', 'O campo senha é obrigatório')
    }

    // async login_user(Usuario: string, password: string, filial:number) {
    //     await this.page.goto(ENV.PAGE_URL)
    //     await this.page.locator('id=login-input-usuario').fill(Usuario.toString())
    //     await this.page.locator('id=login-input-senha').fill(password.toString())
    //     await this.page.locator('id=login-select-filial').selectOption(filial.toString())
    //     await this.page.locator('id=login-button-entrar').click()

    // }

    async login(Usuario: string, password: string, filial:number) {
        await this.go()
        await this.preencherUsuario(Usuario)
        await this.preencherSenha(password)
        await this.preencherFilial(filial)
        await this.submmit()
    }

}
