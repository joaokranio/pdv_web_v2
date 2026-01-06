import { Page, expect } from "@playwright/test"
import { ENV } from '../utils/env'

export class Login {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async go() {
        await this.page.goto(ENV.PAGE_URL)
    }

    async user(Usuario: string) {
        await this.page.locator('id=login-input-usuario').fill(Usuario.toString())
    }

    async pass(password: string) {
        await this.page.locator('id=login-input-senha').fill(password.toString())
    }

    async filial(filial: number) {
        await this.page.locator('id=login-select-filial').selectOption(filial.toString())
    }

    async submmit() {
        await this.page.locator('id=login-button-entrar').click()
    }

    async placeHolder() {        
    await expect(this.page.locator('id=login-input-usuario')).toHaveAttribute('placeholder', 'O campo apelido é obrigatório')
    await expect(this.page.locator('id=login-input-senha')).toHaveAttribute('placeholder', 'O campo senha é obrigatório')
    }

}
