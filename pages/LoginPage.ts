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

    async preencherUsuario(Usuario: string) {
        await this.inputUsuario.fill(Usuario)
    }

    async preencherSenha(password: string) {
        await this.inputSenha.fill(password)
    }

    async preencherFilial(filial: number) {
        await this.selecFilial.selectOption(filial.toString())
    }

    async submmit() {
        await this.btnEntrar.click()
    }

    async placeHolder() {
        await expect(this.inputUsuario)
            .toHaveAttribute('placeholder', 'O campo apelido é obrigatório')
        await expect(this.inputSenha)
            .toHaveAttribute('placeholder', 'O campo senha é obrigatório')
    }
    async login(Usuario: string, password: string, filial:number) {
        await this.go()
        await this.preencherUsuario(Usuario)
        await this.preencherSenha(password)
        await this.preencherFilial(filial)
        await this.submmit()
    }

}
