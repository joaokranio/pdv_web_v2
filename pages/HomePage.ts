import { Page, expect } from "@playwright/test"

export class Logada {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async logado() {
        await expect(this.page.locator('xpath=//button[contains(@class, "dropdown-toggle")]')).toBeVisible()
    }

    async validarResponsividade(isMobile: boolean) {
        const menu = this.page.locator('.sidebar')

        if (isMobile) {
            await expect(menu).not.toBeVisible()
        } else {
            await expect(menu).toBeVisible()
        }
    }

}