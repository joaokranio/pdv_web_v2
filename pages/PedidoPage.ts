import { Page, expect } from "@playwright/test"
import { ENV } from '../utils/env'

export class Pedido {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async pedidoVenda() {
        
    }

}
