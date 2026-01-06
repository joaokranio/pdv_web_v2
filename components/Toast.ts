import { Page, expect } from "@playwright/test"

export class Toast {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async toast(message: string) {
        const toast = this.page.locator('.toast-message', { hasText: message })
        await expect(toast).toBeVisible()
    }

}
